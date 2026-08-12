import { createServerFn } from "@tanstack/react-start";
import {
  getRequestHeader,
  setResponseHeader,
} from "@tanstack/react-start/server";
import { z } from "zod";

const COOKIE_NAME = "pravasx-admin-session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "PravasX@2026!";
const DEMO_SECRET = "pravasx-local-demo-secret-change-this-before-production-2026";

type AdminSession = {
  sub: "admin";
  exp: number;
};

const loginSchema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});

function getConfig() {
  const isProduction = process.env.NODE_ENV === "production";
  const username = process.env.PRAVASX_ADMIN_USERNAME || (!isProduction ? DEMO_USERNAME : "");
  const password = process.env.PRAVASX_ADMIN_PASSWORD || (!isProduction ? DEMO_PASSWORD : "");
  const secret = process.env.PRAVASX_SESSION_SECRET || (!isProduction ? DEMO_SECRET : "");

  if (!username || !password || !secret) {
    throw new Error(
      "Missing admin authentication environment variables. Set PRAVASX_ADMIN_USERNAME, PRAVASX_ADMIN_PASSWORD and PRAVASX_SESSION_SECRET.",
    );
  }

  return { username, password, secret, isProduction };
}

function toBase64Url(input: string | Uint8Array) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : input;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return new Uint8Array([...binary].map((char) => char.charCodeAt(0)));
}

async function sign(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

async function verify(payload: string, signature: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
  return crypto.subtle.verify(
    "HMAC",
    key,
    fromBase64Url(signature),
    new TextEncoder().encode(payload),
  );
}

function parseCookie(header: string | null) {
  if (!header) return null;
  for (const part of header.split(/;\s*/)) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    if (part.slice(0, index) === COOKIE_NAME) return part.slice(index + 1);
  }
  return null;
}

async function createToken(secret: string) {
  const session: AdminSession = {
    sub: "admin",
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const payload = toBase64Url(JSON.stringify(session));
  const signature = await sign(payload, secret);
  return `${payload}.${signature}`;
}

async function readSession() {
  const { secret } = getConfig();
  const token = parseCookie(getRequestHeader("cookie"));
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  try {
    const valid = await verify(payload, signature, secret);
    if (!valid) return null;

    const session = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as Partial<AdminSession>;
    if (session.sub !== "admin" || typeof session.exp !== "number" || session.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return session as AdminSession;
  } catch {
    return null;
  }
}

function setSessionCookie(token: string, isProduction: boolean) {
  setResponseHeader(
    "Set-Cookie",
    [
      `${COOKIE_NAME}=${token}`,
      "HttpOnly",
      "SameSite=Lax",
      "Path=/",
      `Max-Age=${SESSION_TTL_SECONDS}`,
      isProduction ? "Secure" : "",
    ].filter(Boolean).join("; "),
  );
}

function clearSessionCookie(isProduction: boolean) {
  setResponseHeader(
    "Set-Cookie",
    [
      `${COOKIE_NAME}=` ,
      "HttpOnly",
      "SameSite=Lax",
      "Path=/",
      "Max-Age=0",
      isProduction ? "Secure" : "",
    ].filter(Boolean).join("; "),
  );
}

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await readSession();
  return { authenticated: Boolean(session) };
});

export const loginAdmin = createServerFn({ method: "POST" })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    const { username, password, secret, isProduction } = getConfig();

    if (data.username !== username || data.password !== password) {
      return { ok: false as const, error: "Invalid username or password." };
    }

    const token = await createToken(secret);
    setSessionCookie(token, isProduction);
    return { ok: true as const };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { isProduction } = getConfig();
  clearSessionCookie(isProduction);
  return { ok: true as const };
});
