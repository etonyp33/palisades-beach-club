import Parse from "parse/node";
import { requireAdmin } from "../../src/requireAdmin";

Parse.initialize(
  "u5D9tHT4lhdycxqEiDDyt5nAXEuyQuPQ8IuKG0At",
  "Gnf9K4r6E5MYOVkABIirUYw3XcIjMHZx5s8NVALg"
);

Parse.serverURL = "https://parseapi.back4app.com/";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    const { gallerySlug } = req.query;

    if (!gallerySlug) {
      return res.status(400).json({
        error: "Gallery slug is required",
      });
    }

    const query = new Parse.Query("GalleryImage");

    query.equalTo("gallerySlug", gallerySlug);
    query.equalTo("active", true);
    query.ascending("sortOrder");

    const results = await query.find();

    const images = results
      .map((image) => ({
        id: image.id,
        url: image.get("url"),
        filename: image.get("filename") || "",
        width: Number(image.get("width")) || 0,
        height: Number(image.get("height")) || 0,
        sortOrder: Number(image.get("sortOrder")) || 0,
        gallerySlug: image.get("gallerySlug"),
      }))
      .filter((image) => image.url);

    return res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("Gallery images error:", error);

    return res.status(500).json({
      error: "Failed to load gallery images",
      message: error.message,
    });
  }
}