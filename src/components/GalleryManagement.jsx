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

  const [selectedGallery, setSelectedGallery] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);

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

  const updateGallery = async () => {
    if (!editingGallery) return;

    setMessage("");

    const name = galleryName.trim();
    const slug = gallerySlug.trim().toLowerCase();
    const description = galleryDescription.trim();

    if (!name || !slug) {
      setMessage("Gallery name and slug are required.");
      return;
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      setMessage("Gallery slug may contain only lowercase letters, numbers, and hyphens.");
      return;
    }

    setGalleryLoading(true);

    try {
      const response = await fetch("/api/gallery-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          galleryId: editingGallery.id,
          name,
          slug,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update gallery.");
      }

      setEditingGallery(null);
      setGalleryName("");
      setGallerySlug("");
      setGalleryDescription("");

      await loadGalleries();

      setMessage("Gallery updated successfully.");
    } catch (error) {
      console.error("Update gallery error:", error);
      setMessage(error.message || "Failed to update gallery.");
    } finally {
      setGalleryLoading(false);
    }
  };

  const loadGalleryImages = async (gallery) => {
    setSelectedGallery(gallery);
    setGalleryImages([]);
    setImagesLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/gallery-images?gallerySlug=${encodeURIComponent(gallery.slug)}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load gallery images.");
      }

      setGalleryImages(data.images || []);
    } catch (error) {
      console.error("Gallery images error:", error);
      setMessage(error.message || "Failed to load gallery images.");
    } finally {
      setImagesLoading(false);
    }
  };

  const deleteGalleryImage = async (image) => {
    const confirmed = window.confirm(`Delete "${image.filename || "this photo"}"?`);

    if (!confirmed) return;

    setMessage("");
    setImagesLoading(true);

    try {
      const response = await fetch("/api/gallery-image-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageId: image.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete photo.");
      }

      setGalleryImages((currentImages) =>
        currentImages.filter((currentImage) => currentImage.id !== image.id),
      );

      setMessage("Photo deleted successfully.");
    } catch (error) {
      console.error("Delete gallery image error:", error);
      setMessage(error.message || "Failed to delete photo.");
    } finally {
      setImagesLoading(false);
    }
  };

  const uploadGalleryImages = async (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length || !selectedGallery) {
      return;
    }

    setMessage("");
    setUploadingImages(true);

    try {
      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          throw new Error(`${file.name} is not an image.`);
        }

        const image = new Image();

        const dimensions = await new Promise((resolve, reject) => {
          image.onload = () => {
            resolve({
              width: image.naturalWidth,
              height: image.naturalHeight,
            });
          };

          image.onerror = () => {
            reject(new Error(`Could not read ${file.name}.`));
          };

          image.src = URL.createObjectURL(file);
        });

        const params = new URLSearchParams({
          gallerySlug: selectedGallery.slug,
          filename: file.name,
          contentType: file.type,
          width: String(dimensions.width),
          height: String(dimensions.height),
        });

        const response = await fetch(`/api/upload?${params.toString()}`, {
          method: "POST",
          headers: {
            "Content-Type": file.type || "application/octet-stream",
          },
          body: file,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Failed to upload ${file.name}.`);
        }
      }

      await loadGalleryImages(selectedGallery);
      setMessage(`${files.length} photo${files.length === 1 ? "" : "s"} uploaded successfully.`);
    } catch (error) {
      console.error("Gallery upload error:", error);
      setMessage(error.message || "Failed to upload photos.");
    } finally {
      setUploadingImages(false);
      event.target.value = "";
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
      <Typography variant="h5" gutterBottom>
        Gallery Management
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Create and manage photo galleries and their images.
      </Typography>

      {/* Existing Galleries */}

      {/* Existing Galleries */}

      <div className="mb-8">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Existing Galleries
        </Typography>

        {galleries.length === 0 ? (
          <div className="rounded-lg border border-gray-300 p-6 text-gray-600">
            No galleries found.
          </div>
        ) : (
          <div className="space-y-3">
            {galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
              >
                {/* Gallery information and buttons */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-lg">{gallery.name}</div>

                      {editingGallery?.id === gallery.id && (
                        <div className="text-sm font-semibold text-blue-600">Editing</div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">/{gallery.slug}</div>

                    {gallery.description && (
                      <div className="mt-1 text-sm text-gray-600">{gallery.description}</div>
                    )}

                    {gallery.isDefault && (
                      <div className="mt-1 text-sm font-semibold text-gray-500">
                        Default gallery
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outlined"
                      disabled={galleryLoading || imagesLoading || !!editingGallery}
                      onClick={() => {
                        if (selectedGallery?.id === gallery.id) {
                          setSelectedGallery(null);
                          setGalleryImages([]);
                        } else {
                          loadGalleryImages(gallery);
                        }
                      }}
                    >
                      {selectedGallery?.id === gallery.id ? "Hide Photos" : "Manage Photos"}
                    </Button>

                    {!gallery.isDefault && (
                      <Button
                        variant="outlined"
                        disabled={galleryLoading || imagesLoading}
                        onClick={() => {
                          setEditingGallery(gallery);
                          setGalleryName(gallery.name);
                          setGallerySlug(gallery.slug);
                          setGalleryDescription(gallery.description || "");

                          // Close any open photo thumbnails
                          setSelectedGallery(null);
                          setGalleryImages([]);
                        }}
                      >
                        Edit
                      </Button>
                    )}

                    {!gallery.isDefault && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteGallery(gallery)}
                        disabled={galleryLoading}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>

                {/* Photos underneath the buttons */}
                {selectedGallery?.id === gallery.id && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="mb-4 flex items-center gap-3">
                      <Button
                        variant="contained"
                        component="label"
                        disabled={imagesLoading || uploadingImages || galleryLoading}
                      >
                        {uploadingImages ? "Uploading..." : "Add Photos"}
                        <input
                          type="file"
                          hidden
                          multiple
                          accept="image/*"
                          onChange={uploadGalleryImages}
                        />
                      </Button>

                      <span className="text-sm text-gray-500">
                        Add one or more photos to {gallery.name}
                      </span>
                    </div>
                    {imagesLoading ? (
                      <div className="text-sm text-gray-500">Loading photos...</div>
                    ) : galleryImages.length === 0 ? (
                      <div className="text-sm text-gray-500">No photos found in this gallery.</div>
                    ) : (
                      <div className="flex flex-wrap gap-4">
                        {galleryImages.map((image) => (
                          <div
                            key={image.id}
                            className="w-28 overflow-hidden rounded-lg border border-gray-200 bg-white"
                          >
                            <div className="aspect-square overflow-hidden bg-gray-100">
                              <img
                                src={image.url}
                                alt={image.filename || "Gallery photo"}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="p-2">
                              <div className="truncate text-xs text-gray-500">{image.filename}</div>

                              <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                fullWidth
                                sx={{ mt: 1 }}
                                onClick={() => deleteGalleryImage(image)}
                                disabled={imagesLoading || galleryLoading}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Gallery */}

      <div className="rounded-lg border border-gray-300 bg-gray-50 p-6">
        <Typography variant="h6" sx={{ mb: 3 }}>
          {editingGallery ? "Edit Gallery" : "Create New Gallery"}
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
            helperText={
              editingGallery
                ? "Gallery slug cannot be changed after the gallery is created."
                : "Use lowercase letters, numbers, and hyphens. Example: summer-party"
            }
            disabled={galleryLoading || !!editingGallery}
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

          <Button
            variant="contained"
            onClick={editingGallery ? updateGallery : createGallery}
            disabled={galleryLoading}
          >
            {galleryLoading ? "Working..." : editingGallery ? "Save Changes" : "Create Gallery"}
          </Button>

          {editingGallery && (
            <Button
              variant="outlined"
              onClick={() => {
                setEditingGallery(null);
                setGalleryName("");
                setGallerySlug("");
                setGalleryDescription("");

                setSelectedGallery(null);
                setGalleryImages([]);
              }}
              disabled={galleryLoading}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {message && (
        <div className="mt-4 rounded-lg border border-gray-300 bg-white p-4">{message}</div>
      )}
    </div>
  );
};

export default GalleryManagement;
