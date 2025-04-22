import React from "react";
import Avatar from "@mui/material/Avatar";
import { useFormik } from "formik";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import { useState } from "react";
import Button from "@mui/material/Button";

const validationSchema = Yup.object().shape({
  content: Yup.string().required("Post text is required"),
});

const HomeSection = () => {
  const [selectImages, setSelectedImages] = useState([]);

  const handleSubmit = (values) => {
    console.log("values ", values);
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      images: [],
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImages = (event) => {
    const selectedFiles = event.target.files;
    const imgUrls = Array.from(selectedFiles).map((file) =>
      URL.createObjectURL(file)
    );

    // Update Formik with the selected image URLs
    formik.setFieldValue("images", imgUrls);

    // Update the selectImages state to hold the selected image URLs
    setSelectedImages(imgUrls);
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      <section className={"pb-10"}>
        <div className="flex items-center space-x-5">
          <Avatar
            alt="username"
            src="http://res.cloudinary.com/dnbw04gbs/image/upload/v1690639851/instagram%20post/bywtgh9vJ4e80aywstss.png"
          />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit} className="flex flex-col">
              <div>
                <input
                  type="text"
                  name="content"
                  placeholder="What is happening"
                  className="border-none outline-none text-xl bg-transparent w-full"
                  {...formik.getFieldProps("content")}
                  {...(formik.errors.content && formik.touched.content && (
                    <span className="text-red-500">
                      {formik.errors.content}
                    </span>
                  ))}
                />
              </div>

              {/* Display selected image previews */}
              {selectImages.length > 0 && (
                <div className="flex space-x-4 mt-3">
                  {selectImages.map((imgUrl, index) => (
                    <img
                      key={index}
                      src={imgUrl}
                      alt={`Selected Preview ${index}`}
                      className="w-32 h-32 object-cover"
                    />
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImages}
                      multiple // Allows multiple files
                    />
                  </label>
                </div>
                <div>
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: "20px",
                      paddingY: "8px",
                      paddingX: "20px",
                      bgcolor: "#1e88e5",
                    }}
                    variant="contained"
                  >
                    Tweet
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
