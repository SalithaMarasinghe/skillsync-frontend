import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Image as ImageIcon, Videocam, Close } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { createPost } from "../../api";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Post text is required"),
});

const HomeSection = ({ user, refreshPosts }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const images = selectedImages.map(img => img.file);
      await createPost(values.content, images, selectedVideo?.file);
      
      // Clear form without losing context
      formik.resetForm();
      
      // Revoke object URLs to prevent memory leaks
      selectedImages.forEach(img => URL.revokeObjectURL(img.preview));
      if (selectedVideo) URL.revokeObjectURL(selectedVideo.preview);
      
      setSelectedImages([]);
      setSelectedVideo(null);
      
      // Trigger a smooth refresh of posts
      refreshPosts();
      
      // Scroll to top to show the new post
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImages = async (event) => {
    const files = Array.from(event.target.files).slice(0, 3);
    
    // Compress images before preview
    const compressedFiles = await Promise.all(files.map(async (file) => {
      if (file.type.startsWith('image/')) {
        return await compressImage(file);
      }
      return file;
    }));
  
    const newImages = compressedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setSelectedImages(newImages);
    setSelectedVideo(null);
    event.target.value = null;
  };

  const handleSelectVideo = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedVideo({
        file,
        preview: URL.createObjectURL(file)
      });
      setSelectedImages([]);
      event.target.value = null; // Reset input
    }
  };

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      if (file.size < 500000) { // Don't compress if already small
        resolve(file);
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1024;
          const MAX_HEIGHT = 1024;
          let width = img.width;
          let height = img.height;
  
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
  
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
  
          canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            }));
          }, 'image/jpeg', 0.7);
        };
      };
      reader.readAsDataURL(file);
    });
  };
  
  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const removeVideo = () => {
    setSelectedVideo(null);
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="space-y-5 bg-white rounded-lg shadow p-4 mb-4">
      <section>
        <h1 className="py-3 text-xl font-bold text-gray-800">Create Post</h1>
      </section>
      <section className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar
            alt={user.name}
            src={user.photo || "https://via.placeholder.com/150"}
            sx={{ width: 48, height: 48 }}
          />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <div>
                <textarea
                  name="content"
                  placeholder="What's on your mind?"
                  className="border-none outline-none text-xl bg-transparent w-full resize-none min-h-[100px] placeholder-gray-400"
                  {...formik.getFieldProps("content")}
                />
                {formik.errors.content && formik.touched.content && (
                  <span className="text-red-500 text-sm">
                    {formik.errors.content}
                  </span>
                )}
              </div>

              {/* Media previews */}
              <div className="mt-3 space-y-2">
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img.preview}
                          alt={`Preview ${index}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Close fontSize="small" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {selectedVideo && (
                  <div className="relative">
                    <video
                      src={selectedVideo.preview}
                      controls
                      className="w-full max-h-64 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1"
                    >
                      <Close fontSize="small" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                <div className="flex space-x-4 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer hover:bg-gray-100 p-2">
                    <ImageIcon className="text-blue-500" />
                    <span className="text-gray-600">Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleSelectImages}
                    />
                  </label>
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer hover:bg-gray-100 p-2">
                    <Videocam className="text-green-500" />
                    <span className="text-gray-600">Video</span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleSelectVideo}
                    />
                  </label>
                </div>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      paddingX: "24px",
                      paddingY: "8px",
                      bgcolor: "#1e88e5",
                      textTransform: "none",
                      fontSize: "16px",
                      fontWeight: "600",
                      "&:hover": {
                        bgcolor: "#1565c0",
                      },
                    }}
                    disabled={isSubmitting || (!formik.values.content && !selectedImages.length && !selectedVideo)}
                  >
                    {isSubmitting ? 'Posting...' : 'Post'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSection;