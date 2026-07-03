import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { BASE_URL } from "./axiosAuth";

type ServerFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

const buildUrl = (path: string) => {
  const base = BASE_URL.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
};

// The access token lives only in the browser (in-memory token store), so a
// server component has no way to read it. Instead we exchange the refresh
// cookie for a fresh access token here. Wrapped in React's cache() so multiple
// serverFetch calls within a single render only hit /auth/refresh once.
const getServerAccessToken = cache(async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  if (!cookieHeader) return null;

  try {
    const res = await fetch(buildUrl("/auth/refresh"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { accessToken?: string };
    return data.accessToken ?? null;
  } catch {
    return null;
  }
});

// Gate a protected server component: exchange the refresh cookie for an access
// token and bounce to /login if that fails (cookie absent, expired, or stale —
// the backend answers 400/403 in those cases). Reuses the cached refresh call,
// so pairing this with serverFetch in the same render costs one network round
// trip. Must be called at the top of the component, outside any try/catch, so
// the redirect can propagate.
export async function requireServerAuth(): Promise<string> {
  const token = await getServerAccessToken();
  if (!token) {
    redirect("/login");
  }
  return token;
}

export async function serverFetch<T>(
  path: string,
  options: ServerFetchOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options;
  const cookieStore = await cookies();
  const accessToken = await getServerAccessToken();

  const res = await fetch(buildUrl(path), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: rest.cache ?? "no-store",
  });

  if (!res.ok) {
    throw new Error(`serverFetch ${path} failed: ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}
