import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const GalleryManagement = ({
  galleries,
  galleryName,
  setGalleryName,
  gallerySlug,
  setGallerySlug,
  galleryDescription,
  setGalleryDescription,
  galleryLoading,
  setGalleryLoading,
  loadGalleries,
}) => {
  const [message, setMessage] = useState("");

  const createGallery = async () => {
    setMessage("");

    const name = galleryName.trim();
    const slug = gallerySlug.trim().toLowerCase();
    const description = galleryDescription.trim();

    if (!name || !slug) {
      setMessage("Gallery name and slug are required.");
      return;
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      setMessage("Slug may contain only lowercase letters, numbers, and hyphens.");
      return;
    }

    setGalleryLoading(true);

    try {
      const response = await fetch("/api/gallery-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          slug,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create gallery.");
      }

      setGalleryName("");
      setGallerySlug("");
      setGalleryDescription("");

      await loadGalleries();

      setMessage("Gallery created successfully.");
    } catch (error) {
      console.error("Create gallery error:", error);
      setMessage(error.message || "Failed to create gallery.");
    } finally {
      setGalleryLoading(false);
    }
  };

  const deleteGallery = async (gallery) => {
    const confirmed = window.confirm(
      `Delete "${gallery.name}"?\n\nThis will delete the gallery and all of its uploaded images.`,
    );

    if (!confirmed) return;

    setMessage("");
    setGalleryLoading(true);

    try {
      const response = await fetch("/api/gallery-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          galleryId: gallery.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete gallery.");
      }

      await loadGalleries();

      setMessage(`Gallery deleted. ${data.deletedImages || 0} image(s) were removed.`);
    } catch (error) {
      console.error("Delete gallery error:", error);
      setMessage(error.message || "Failed to delete gallery.");
    } finally {
      setGalleryLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl px-6 py-6">
      <Typography variant="h4" gutterBottom>
        Gallery Management
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Create and remove photo galleries. Images are uploaded separately through the Upload page.
      </Typography>

      {/* Existing Galleries */}

      <div className="mb-8">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Existing Galleries
        </Typography>

        {galleries.length === 0 ? (
          <div className="rounded-lg border border-gray-300 p-6 text-gray-600">
            No galleries found.
          </div>
        ) : (
          <div className="space-y-3">
            {galleries.map((gallery) => (
              <>
                {!gallery.isDefault && (
                  <>
                    {" "}
                    <div
                      key={gallery.id}
                      className="flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
                    >
                      <div>
                        <div className="font-semibold text-lg">{gallery.name}</div>

                        <div className="text-sm text-gray-500">/{gallery.slug}</div>

                        {gallery.description && (
                          <div className="mt-1 text-sm text-gray-600">{gallery.description}</div>
                        )}

                        {/* {gallery.isDefault && (
                    <div className="mt-1 text-sm font-semibold">Default gallery</div>
                  )} */}
                      </div>

                      {!gallery.isDefault ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => deleteGallery(gallery)}
                          disabled={galleryLoading}
                        >
                          Delete
                        </Button>
                      ) : (
                        <div className="text-sm font-semibold text-gray-500">Default gallery</div>
                      )}
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
        )}
      </div>

      {/* Create Gallery */}

      <div className="rounded-lg border border-gray-300 bg-gray-50 p-6">
        <Typography variant="h5" sx={{ mb: 3 }}>
          Create New Gallery
        </Typography>

        <div className="space-y-4">
          <TextField
            fullWidth
            label="Gallery Name"
            value={galleryName}
            onChange={(e) => setGalleryName(e.target.value)}
            disabled={galleryLoading}
          />

          <TextField
            fullWidth
            label="Gallery Slug"
            value={gallerySlug}
            onChange={(e) => setGallerySlug(e.target.value.toLowerCase())}
            helperText="Use lowercase letters, numbers, and hyphens. Example: summer-party"
            disabled={galleryLoading}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={galleryDescription}
            onChange={(e) => setGalleryDescription(e.target.value)}
            disabled={galleryLoading}
          />

          <Button variant="contained" onClick={createGallery} disabled={galleryLoading}>
            {galleryLoading ? "Working..." : "Create Gallery"}
          </Button>
        </div>
      </div>

      {message && (
        <div className="mt-4 rounded-lg border border-gray-300 bg-white p-4">{message}</div>
      )}
    </div>
  );
};

export default GalleryManagement;
