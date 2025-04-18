import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  handle: Yup.string().required("Handle is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  bio: Yup.string(),
  photo: Yup.string().url("Must be a valid URL")
});

const ProfileSettings = ({ initialProfile, onSave, onCancel }) => {
  const formik = useFormik({
    initialValues: initialProfile,
    validationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
    enableReinitialize: true
  });

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md border border-gray-200 flex flex-col p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Update Profile Settings</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            type="text"
            className="w-full border rounded px-3 py-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Handle</label>
          <input
            name="handle"
            type="text"
            className="w-full border rounded px-3 py-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.handle}
          />
          {formik.touched.handle && formik.errors.handle && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.handle}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            className="w-full border rounded px-3 py-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            name="bio"
            className="w-full border rounded px-3 py-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bio}
          />
          {formik.touched.bio && formik.errors.bio && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.bio}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Profile Photo URL</label>
          <input
            name="photo"
            type="url"
            className="w-full border rounded px-3 py-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.photo}
          />
          {formik.touched.photo && formik.errors.photo && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.photo}</div>
          )}
        </div>
        <div className="flex space-x-3 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-semibold"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
