import { del } from "@vercel/blob";
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
    const { imageId } = req.body || {};

    if (!imageId) {
      return res.status(400).json({
        error: "Image ID is required",
      });
    }

    const imageQuery = new Parse.Query("GalleryImage");
    const image = await imageQuery.get(imageId);

    const url = image.get("url");

    // Delete the image from Vercel Blob.
    if (url) {
      try {
        await del(url);
      } catch (blobError) {
        console.error(
          "Failed to delete Blob:",
          url,
          blobError.message
        );
      }
    }

    // Delete the GalleryImage record from Back4App.
    await image.destroy();

    return res.status(200).json({
      success: true,
      deletedImage: imageId,
    });
  } catch (error) {
    console.error("Gallery image delete error:", error);

    return res.status(500).json({
      error: "Failed to delete gallery image",
      message: error.message,
    });
  }
}