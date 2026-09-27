import Parse from "parse/node";
import { requireAdmin } from "../../src/requireAdmin";

Parse.initialize(
  "u5D9tHT4lhdycxqEiDDyt5nAXEuyQuPQ8IuKG0At",
  "Gnf9K4r6E5MYOVkABIirUYw3XcIjMHZx5s8NVALg"
);

Parse.serverURL = "https://parseapi.back4app.com/";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const admin = await requireAdmin(req, res);

  if (!admin) return;

  try {
    const { gallerySlug, imageIds } = req.body || {};

    if (!gallerySlug) {
      return res.status(400).json({
        error: "Gallery slug is required",
      });
    }

    if (!Array.isArray(imageIds) || imageIds.length === 0) {
      return res.status(400).json({
        error: "Image IDs are required",
      });
    }

    if (!/^[a-z0-9-]+$/.test(gallerySlug)) {
      return res.status(400).json({
        error: "Invalid gallery slug",
      });
    }

    // Load all images belonging to this gallery.
    const query = new Parse.Query("GalleryImage");

    query.equalTo("gallerySlug", gallerySlug);
    query.equalTo("active", true);

    const images = await query.find();

    const imageMap = new Map(
      images.map((image) => [image.id, image])
    );

    // Make sure every submitted image actually belongs
    // to this gallery.
    for (const imageId of imageIds) {
      if (!imageMap.has(imageId)) {
        return res.status(400).json({
          error: "One or more images do not belong to this gallery.",
        });
      }
    }

    // Make sure the submitted list contains every image
    // currently in the gallery.
    if (imageIds.length !== images.length) {
      return res.status(400).json({
        error: "The image list does not match the gallery.",
      });
    }

    // Update sortOrder based on the submitted order.
    for (let index = 0; index < imageIds.length; index++) {
      const image = imageMap.get(imageIds[index]);

      image.set("sortOrder", index);
    }

    await Parse.Object.saveAll(images);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Gallery image reorder error:", error);

    return res.status(500).json({
      error: "Failed to reorder gallery images",
      message: error.message,
    });
  }
}