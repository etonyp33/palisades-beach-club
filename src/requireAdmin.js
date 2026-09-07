import {
  getAdminCookieName,
  isValidAdminCookie,
} from "./adminAuth";

export async function requireAdmin(req, res) {
  const cookieHeader = req.headers.cookie || "";

  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((cookie) => cookie.trim())
      .filter(Boolean)
      .map((cookie) => {
        const index = cookie.indexOf("=");

        return [
          cookie.substring(0, index),
          cookie.substring(index + 1),
        ];
      }),
  );

  const cookieValue = cookies[getAdminCookieName()];

  if (!cookieValue) {
    res.status(401).json({
      error: "Administrator authentication required",
    });

    return null;
  }

  try {
    const decodedCookie = decodeURIComponent(cookieValue);

    if (!isValidAdminCookie(decodedCookie)) {
      res.status(401).json({
        error: "Administrator authentication required",
      });

      return null;
    }

    console.log("Admin authenticated");

    return {
      authenticated: true,
    };
  } catch (error) {
    console.error("Admin authentication error:", error);

    res.status(401).json({
      error: "Administrator authentication required",
    });

    return null;
  }
}