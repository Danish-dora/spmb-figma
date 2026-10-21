import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession(token) {
  const secret = process.env.SESSION_SECRET;
  if (!token || !secret || secret.length < 32) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { algorithms: ["HS256"] }
    );
    return payload;
  } catch {
    return null;
  }
}

export async function requireRole(allowedRoles) {
  const cookieStore = await cookies();
  const token = cookieStore.get("spmb_session")?.value;
  const session = await getSession(token);

  if (!session || !allowedRoles.includes(session.role)) {
    redirect("/login");
  }
  return session;
}