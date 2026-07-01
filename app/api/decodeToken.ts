// The access token is a JWT whose payload already carries the user data the
// backend signs in on login/refresh. We decode it client-side to populate the
// store instead of hitting a separate /me endpoint.

export interface AuthUser {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar: string | null;
}

export const decodeToken = (token: string): AuthUser | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    // base64url -> base64, then decode handling non-ASCII characters.
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(json) as AuthUser;
  } catch {
    return null;
  }
};
