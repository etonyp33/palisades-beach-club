import { put } from "@vercel/blob";
import crypto from "crypto";
import { requireAdmin } from "../../src/requireAdmin";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const admin = await requireAdmin(req, res);

  if (!admin) {
    return;
  }

  try {
    const { gallerySlug, filename, contentType, width, height } = req.query;

    if (!gallerySlug || !filename) {
      return res.status(400).json({
        error: "gallerySlug and filename are required",
      });
    }

    if (!/^[a-z0-9-]+$/.test(gallerySlug)) {
      return res.status(400).json({
        error: "Invalid gallery slug",
      });
    }

    if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
      return res.status(400).json({
        error: "Invalid filename",
      });
    }

    const imageWidth = Number(width);
    const imageHeight = Number(height);

    if (
      !Number.isFinite(imageWidth) ||
      !Number.isFinite(imageHeight) ||
      imageWidth <= 0 ||
      imageHeight <= 0
    ) {
      return res.status(400).json({
        error: "Valid image width and height are required",
      });
    }

    const chunks = [];

    for await (const chunk of req) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    if (!buffer.length) {
      return res.status(400).json({
        error: "No file received",
      });
    }

    console.log("Gallery upload:");
    console.log("Gallery:", gallerySlug);
    console.log("Filename:", filename);
    console.log("Content type:", contentType);
    console.log("Width:", imageWidth);
    console.log("Height:", imageHeight);
    console.log("Size:", buffer.length);

    // Upload image to Vercel Blob
    const extension = filename.includes(".") ? filename.substring(filename.lastIndexOf(".")) : "";


    const uniqueFilename = `${crypto.randomUUID()}${extension}`;

    const blob = await put(`gallery/${gallerySlug}/${uniqueFilename}`, buffer, {
      access: "public",
      contentType: contentType || "application/octet-stream",
    });
    console.log("Blob uploaded:", blob.url);

    // Create GalleryImage record in Back4App
    const parseResponse = await fetch("https://parseapi.back4app.com/classes/GalleryImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": "u5D9tHT4lhdycxqEiDDyt5nAXEuyQuPQ8IuKG0At",
        "X-Parse-REST-API-Key": process.env.BACK4APP_REST_API_KEY,
      },
      body: JSON.stringify({
        gallerySlug,
        filename,
        url: blob.url,
        width: imageWidth,
        height: imageHeight,
        sortOrder: 0,
        active: true,
      }),
    });

    const parseData = await parseResponse.json();

    console.log("GalleryImage status:", parseResponse.status);
    console.log("GalleryImage response:", parseData);

    if (!parseResponse.ok) {
      throw new Error(parseData.error || "Failed to create GalleryImage");
    }

    return res.status(200).json({
      success: true,
      blob,
      galleryImage: parseData,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return res.status(500).json({
      error: "Upload failed",
      message: error.message,
    });
  }
}
