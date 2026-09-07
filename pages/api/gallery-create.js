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
    const { name, slug, description } = req.body || {};

    if (!name || !slug) {
      return res.status(400).json({
        error: "Gallery name and slug are required",
      });
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      return res.status(400).json({
        error:
          "Gallery slug may contain only lowercase letters, numbers, and hyphens",
      });
    }

    const existingQuery = new Parse.Query("Gallery");
    existingQuery.equalTo("slug", slug);

    const existing = await existingQuery.first();

    if (existing) {
      return res.status(409).json({
        error: "A gallery with this slug already exists",
      });
    }

    const countQuery = new Parse.Query("Gallery");
    const count = await countQuery.count();

    const gallery = new Parse.Object("Gallery");

    gallery.set("name", name.trim());
    gallery.set("slug", slug.trim());
    gallery.set("description", (description || "").trim());
    gallery.set("active", true);
    gallery.set("isDefault", count === 0);
    gallery.set("sortOrder", count);

    const savedGallery = await gallery.save();

    return res.status(200).json({
      success: true,
      gallery: {
        id: savedGallery.id,
        name: savedGallery.get("name"),
        slug: savedGallery.get("slug"),
        description: savedGallery.get("description"),
        active: savedGallery.get("active"),
        isDefault: savedGallery.get("isDefault"),
        sortOrder: savedGallery.get("sortOrder"),
      },
    });
  } catch (error) {
    console.error("Gallery create error:", error);

    return res.status(500).json({
      error: "Failed to create gallery",
      message: error.message,
    });
  }
}