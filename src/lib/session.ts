import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Server-side guard: returns the session or redirects to /signin (then back to `path`). */
export async function requireSession(path: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(path)}&reason=protected`);
  }
  return session;
}
