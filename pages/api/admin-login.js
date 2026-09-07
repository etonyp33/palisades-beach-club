import {
  isAdminPassword,
  createAdminCookieValue,
  getAdminCookieName,
  getAdminCookieMaxAge,
} from "../../src/adminAuth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { password } = req.body || {};
    if (!isAdminPassword(password)) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const cookieValue = createAdminCookieValue();

    res.setHeader(
      "Set-Cookie",
      `${getAdminCookieName()}=${cookieValue}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${getAdminCookieMaxAge()}`
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      error: "Login failed",
    });
  }
}