import crypto from "crypto";
import md5 from "md5";

const ADMIN_COOKIE = "pcb_admin";
const COOKIE_MAX_AGE = 60 * 60 * 12; // 12 hours

function getAdminHashes() {
  return [
    process.env.ADMIN_LOGIN_1,
    process.env.ADMIN_LOGIN_2,
  ].filter(Boolean);
}

export function isAdminPassword(password) {
  if (!password) return false;

  const hash = md5(password.toLowerCase());

  return getAdminHashes().some(
    (adminHash) => hash === adminHash
  );
}

function getSigningSecret() {
  if (!process.env.NEXT_ADMIN_COOKIE_SECRET) {
    throw new Error("NEXT_ADMIN_COOKIE_SECRET is not configured");
  }

  return process.env.NEXT_ADMIN_COOKIE_SECRET;
}

function createSignature(value) {
  return crypto
    .createHmac("sha256", getSigningSecret())
    .update(value)
    .digest("hex");
}

export function createAdminCookieValue() {
  const timestamp = Date.now().toString();

  return `${timestamp}.${createSignature(timestamp)}`;
}

export function isValidAdminCookie(cookieValue) {
  if (!cookieValue) return false;

  const parts = cookieValue.split(".");

  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;

  const timestampNumber = Number(timestamp);

  if (!Number.isFinite(timestampNumber)) {
    return false;
  }

  /*
   * Cookie expires after 12 hours.
   */
  if (Date.now() - timestampNumber > COOKIE_MAX_AGE * 1000) {
    return false;
  }

  const expectedSignature = createSignature(timestamp);

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

export function getAdminCookieName() {
  return ADMIN_COOKIE;
}

export function getAdminCookieMaxAge() {
  return COOKIE_MAX_AGE;
}