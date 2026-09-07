import React, { useEffect, useRef, useState } from "react";
import Parse from "../../src/parse";
import Nav from "./nav";

const Upload = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState("");
  const [loadingGalleries, setLoadingGalleries] = useState(true);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatuses, setUploadStatuses] = useState({});
  const [uploadMessage, setUploadMessage] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadGalleries = async () => {
      try {
        const query = new Parse.Query("Gallery");

        query.equalTo("active", true);
        query.ascending("sortOrder");

        const results = await query.find();

        const galleryData = results.map((gallery) => ({
          id: gallery.id,
          name: gallery.get("name"),
          slug: gallery.get("slug"),
          description: gallery.get("description") || "",
          isDefault: gallery.get("isDefault") || false,
          sortOrder: gallery.get("sortOrder") || 0,
        }));

        setGalleries(galleryData);

        const defaultGallery = galleryData.find((gallery) => gallery.isDefault);

        if (defaultGallery) {
          setSelectedGallery(defaultGallery.slug);
        } else if (galleryData.length > 0) {
          setSelectedGallery(galleryData[0].slug);
        }
      } catch (error) {
        alert("Gallery error: " + error.message);
        console.error("Gallery error:", error);
      } finally {
        setLoadingGalleries(false);
      }
    };

    loadGalleries();
  }, []);

  const addFiles = (files) => {
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));

    if (!imageFiles.length) {
      setUploadMessage("Please select image files only.");
      return;
    }

    setSelectedFiles((currentFiles) => {
      const existingKeys = new Set(
        currentFiles.map((file) => `${file.name}-${file.size}-${file.lastModified}`),
      );

      const newFiles = imageFiles.filter((file) => {
        const key = `${file.name}-${file.size}-${file.lastModified}`;
        return !existingKeys.has(key);
      });

      return [...currentFiles, ...newFiles];
    });

    setUploadMessage("");
    setUploadStatuses({});
  };

  const handleFileSelect = (event) => {
    addFiles(event.target.files);

    // Allows selecting the same file again later.
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    if (event.dataTransfer.files) {
      addFiles(event.dataTransfer.files);
    }
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles((files) => files.filter((_, index) => index !== indexToRemove));
  };

  const clearFiles = () => {
    setSelectedFiles([]);
    setUploadStatuses({});
    setUploadMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFiles = async () => {
    if (!selectedGallery) {
      setUploadMessage("Please select a gallery first.");
      return;
    }

    if (!selectedFiles.length) {
      setUploadMessage("Please select at least one image.");
      return;
    }

    setUploading(true);
    setUploadMessage("");

    const statuses = {};

    for (const file of selectedFiles) {
      const fileKey = `${file.name}-${file.size}-${file.lastModified}`;

      statuses[fileKey] = "uploading";
      setUploadStatuses({ ...statuses });

      try {
        const { width, height } = await getImageDimensions(file);
        const params = new URLSearchParams({
          gallerySlug: selectedGallery,
          filename: file.name,
          contentType: file.type,
          width: String(width),
          height: String(height),
        });

        const response = await fetch(`/api/upload?${params.toString()}`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": file.type || "application/octet-stream",
          },
          body: file,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || data.error || "Upload failed");
        }

        statuses[fileKey] = "success";
        setUploadStatuses({ ...statuses });

        console.log("Uploaded:", data.blob);
      } catch (error) {
        console.error("Upload error:", error);

        statuses[fileKey] = `error: ${error.message}`;
        setUploadStatuses({ ...statuses });
      }
    }

    const failed = Object.values(statuses).filter((status) => status.startsWith("error:"));

    const successful = Object.values(statuses).filter((status) => status === "success");

    if (failed.length === 0) {
      setUploadMessage(
        `${successful.length} image${successful.length === 1 ? "" : "s"} uploaded successfully.`,
      );

      setSelectedFiles([]);
      setUploadStatuses({});

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      setUploadMessage(`${successful.length} uploaded successfully. ${failed.length} failed.`);
    }

    setUploading(false);
  };

  const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const image = new window.Image();

      image.onload = () => {
        resolve({
          width: image.naturalWidth,
          height: image.naturalHeight,
        });

        URL.revokeObjectURL(image.src);
      };

      image.onerror = () => {
        URL.revokeObjectURL(image.src);
        reject(new Error("Unable to read image dimensions"));
      };

      image.src = URL.createObjectURL(file);
    });
  };

  return (
    <>
      <Nav />

      <div className="basic-pg p-60 pg-reservations  flex items-center justify-center min-h-screen bg-fixed bg-center bg-cover custom-img py-10">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[2] bgUnderlay" />

        <div className="z-[2] main-box main-box-admin p-5 m-auto bg-white rounded-lg w-full max-w-2xl">
          <h1 className="text-2xl mb-6">Gallery Upload</h1>

          {loadingGalleries ? (
            <p>Loading galleries...</p>
          ) : (
            <>
              {/* Gallery selector */}
              <label className="block mb-2 font-semibold">Gallery</label>

              <select
                value={selectedGallery}
                onChange={(event) => setSelectedGallery(event.target.value)}
                className="border rounded px-3 py-2 w-full mb-6"
                disabled={uploading}
              >
                {galleries.map((gallery) => (
                  <option key={gallery.id} value={gallery.slug}>
                    {gallery.name}
                  </option>
                ))}
              </select>

              {/* Drop zone */}
              <div
                onDragOver={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setIsDragging(true);
                }}
                onDragEnter={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setIsDragging(true);
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setIsDragging(false);
                }}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition mb-5 ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400 bg-gray-50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="text-lg font-semibold mb-2">
                  {isDragging ? "Drop images here" : "Drag & drop images here"}
                </div>

                <div className="text-sm text-gray-600">or click to choose images</div>
              </div>

              {/* Selected files */}
              {selectedFiles.length > 0 && (
                <div className="mb-5">
                  <div className="font-semibold mb-2">Selected Images</div>

                  <div className="border rounded divide-y">
                    {selectedFiles.map((file, index) => {
                      const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
                      const status = uploadStatuses[fileKey];

                      return (
                        <div key={fileKey} className="flex items-center justify-between gap-3 p-3">
                          <div className="min-w-0">
                            <div className="truncate font-medium">{file.name}</div>

                            <div className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {status === "uploading" && (
                              <span className="text-sm">Uploading...</span>
                            )}

                            {status === "success" && <span className="text-sm">✓ Uploaded</span>}

                            {status?.startsWith("error:") && (
                              <span className="text-sm text-red-600">Failed</span>
                            )}

                            {!uploading && (
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  removeFile(index);
                                }}
                                className="text-sm underline"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Message */}
              {uploadMessage && <div className="mb-5 text-sm">{uploadMessage}</div>}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={uploadFiles}
                  disabled={uploading || !selectedGallery || selectedFiles.length === 0}
                  className="px-5 py-2 rounded bg-black text-white disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload Images"}
                </button>

                {selectedFiles.length > 0 && !uploading && (
                  <button type="button" onClick={clearFiles} className="px-5 py-2 rounded border">
                    Clear
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Upload;
