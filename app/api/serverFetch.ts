import { cookies } from "next/headers";
import { BASE_URL } from "./axiosAuth";

type ServerFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

const buildUrl = (path: string) => {
  const base = BASE_URL.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
};

export async function serverFetch<T>(
  path: string,
  options: ServerFetchOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options;
  const cookieStore = await cookies();

  const res = await fetch(buildUrl(path), {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
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
