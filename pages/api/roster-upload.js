import { put } from "@vercel/blob";
import { requireAdmin } from "../../src/requireAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    const filename = "roster.pdf";

    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    if (!buffer.length) {
      return res.status(400).json({ error: "No file received" });
    }

    const blob = await put(`roster/${filename}`, buffer, {
      access: "public",
      contentType: "application/pdf",
      allowOverwrite: true,
    });

    const queryResponse = await fetch("https://parseapi.back4app.com/classes/RosterDocument", {
      method: "GET",
      headers: {
        "X-Parse-Application-Id": "u5D9tHT4lhdycxqEiDDyt5nAXEuyQuPQ8IuKG0At",
        "X-Parse-REST-API-Key": process.env.BACK4APP_REST_API_KEY,
      },
    });

    const queryData = await queryResponse.json();

    if (!queryResponse.ok) {
      throw new Error(queryData.error || "Failed to retrieve roster record");
    }

    let response;

    if (queryData.results && queryData.results.length > 0) {
      const objectId = queryData.results[0].objectId;

      response = await fetch(`https://parseapi.back4app.com/classes/RosterDocument/${objectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Parse-Application-Id": "u5D9tHT4lhdycxqEiDDyt5nAXEuyQuPQ8IuKG0At",
          "X-Parse-REST-API-Key": process.env.BACK4APP_REST_API_KEY,
        },
        body: JSON.stringify({
          url: blob.url,
          filename,
          active: true,
        }),
      });
    } else {
      response = await fetch("https://parseapi.back4app.com/classes/RosterDocument", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Parse-Application-Id": "u5D9tHT4lhdycxqEiDDyt5nAXEuyQuPQ8IuKG0At",
          "X-Parse-REST-API-Key": process.env.BACK4APP_REST_API_KEY,
        },
        body: JSON.stringify({
          url: blob.url,
          filename,
          active: true,
        }),
      });
    }

    const parseData = await response.json();

    if (!response.ok) {
      throw new Error(parseData.error || "Failed to save roster");
    }

    return res.status(200).json({
      success: true,
      blob,
      roster: parseData,
    });
  } catch (error) {
    console.error("Roster upload error:", error);

    return res.status(500).json({
      error: "Roster upload failed",
      message: error.message,
    });
  }
}
