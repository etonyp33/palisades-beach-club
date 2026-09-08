import { del } from "@vercel/blob";
import Parse from "parse/node";
import { requireAdmin } from "../../src/requireAdmin";

Parse.initialize(
  "u5D9tHT4lhdycxqEiDDyt5nAXEuyQuPQ8IuKG0At",
  "Gnf9K4r6E5MYOVkABIirUYw3XcIjMHZx5s8NVALg",
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
    const { galleryId } = req.body || {};

    if (!galleryId) {
      return res.status(400).json({
        error: "Gallery ID is required",
      });
    }

    const galleryQuery = new Parse.Query("Gallery");
    const gallery = await galleryQuery.get(galleryId);

    const slug = gallery.get("slug");
    const wasDefault = gallery.get("isDefault") === true;

    if (wasDefault) {
      return res.status(400).json({
        error: "The default gallery cannot be deleted.",
      });
    }

    if (!slug) {
      return res.status(400).json({
        error: "Gallery has no slug",
      });
    }
    const imageQuery = new Parse.Query("GalleryImage");
    imageQuery.equalTo("gallerySlug", slug);

    const images = await imageQuery.find();

    // Delete the images from Vercel Blob.
    for (const image of images) {
      const url = image.get("url");

      if (url) {
        try {
          await del(url);
        } catch (blobError) {
          console.error("Failed to delete Blob:", url, blobError.message);
        }
      }
    }

    // Delete GalleryImage records from Back4App.
    if (images.length > 0) {
      await Parse.Object.destroyAll(images);
    }

    // Delete the Gallery record.
    await gallery.destroy();

    return res.status(200).json({
      success: true,
      deletedGallery: slug,
      deletedImages: images.length,
    });
  } catch (error) {
    console.error("Gallery delete error:", error);

    return res.status(500).json({
      error: "Failed to delete gallery",
      message: error.message,
    });
  }
}
