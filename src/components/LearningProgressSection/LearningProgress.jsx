import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ProgressCard = ({ progress, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6 max-w-xl mx-auto border border-gray-200">
    <h3 className="text-2xl font-semibold mb-2 text-green-700">
      {progress.name}
    </h3>
    <p className="mb-4 text-gray-700">{progress.description}</p>
    <div className="mb-2">
      <strong className="text-gray-800">Topics:</strong>
      <ul className="list-disc list-inside ml-4">
        {progress.topics.map((topic, idx) => (
          <li key={idx} className="text-gray-600">
            {topic.name}
          </li>
        ))}
      </ul>
    </div>
    <div className="mb-2">
      <strong className="text-gray-800">Resources:</strong>
      <ul className="list-disc list-inside ml-4">
        {progress.resources.map((resource, idx) => (
          <li key={idx} className="text-gray-600">
            {resource.name}
          </li>
        ))}
      </ul>
    </div>
    <div>
      <strong className="text-gray-800">Progress:</strong>{" "}
      <span className="text-green-700 font-semibold">{progress.progress}%</span>
    </div>
    <div className="flex mt-4 space-x-2">
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded"
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  </div>
);

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  topics: Yup.string().required("At least one topic is required"),
  resources: Yup.string().required("At least one resource is required"),
  progress: Yup.number().min(0).max(100).required("Progress is required"),
});

const LearningProgress = () => {
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "http://localhost:4043/api/learning-progress",
        {
          withCredentials: true,
        }
      );
      setProgressList(response.data);
    } catch (err) {
      console.error("Error fetching learning progress:", err);
      setError("Failed to fetch learning progress. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      topics: "",
      resources: "",
      progress: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        const progressItem = {
          name: values.name,
          description: values.description,
          topics: values.topics
            .split(",")
            .map((t) => ({ name: t.trim() }))
            .filter((t) => t.name),
          resources: values.resources
            .split(",")
            .map((r) => ({ name: r.trim() }))
            .filter((r) => r.name),
          progress: Number(values.progress),
        };

        if (editIndex !== null) {
          await axios.put(
            `http://localhost:4043/api/learning-progress/${progressList[editIndex].id}`,
            progressItem,
            { withCredentials: true }
          );
        } else {
          await axios.post(
            "http://localhost:4043/api/learning-progress",
            progressItem,
            { withCredentials: true }
          );
        }

        await fetchProgress();
        setEditIndex(null);
        resetForm();
      } catch (err) {
        console.error("Error saving learning progress:", err);
        setError("Failed to save learning progress. Please try again later.");
      }
    },
  });

  const handleEdit = (index) => {
    setEditIndex(index);
    const item = progressList[index];
    formik.setValues({
      name: item.name,
      description: item.description,
      topics: item.topics.map((t) => t.name).join(", "),
      resources: item.resources.map((r) => r.name).join(", "),
      progress: item.progress,
    });
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(
        `http://localhost:4043/api/learning-progress/${progressList[index].id}`,
        { withCredentials: true }
      );
      await fetchProgress();
      if (editIndex === index) {
        setEditIndex(null);
        formik.resetForm();
      }
    } catch (err) {
      console.error("Error deleting learning progress:", err);
      setError("Failed to delete learning progress. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-progress-container bg-gray-50 min-h-screen py-8">
      <form
        className="bg-white max-w-xl mx-auto rounded-lg shadow-md p-6 mb-8 border border-green-200"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4 text-green-700">
          {editIndex !== null
            ? "Edit Learning Progress"
            : "Add Learning Progress"}
        </h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="topics">
            Topics{" "}
            <span className="text-xs text-gray-500">(comma-separated)</span>
          </label>
          <input
            id="topics"
            name="topics"
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.topics}
          />
          {formik.touched.topics && formik.errors.topics && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.topics}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="resources">
            Resources{" "}
            <span className="text-xs text-gray-500">(comma-separated)</span>
          </label>
          <input
            id="resources"
            name="resources"
            type="text"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resources}
          />
          {formik.touched.resources && formik.errors.resources && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.resources}
            </div>
          )}
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium" htmlFor="progress">
            Progress <span className="text-xs text-gray-500">(0-100%)</span>
          </label>
          <input
            id="progress"
            name="progress"
            type="number"
            min="0"
            max="100"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.progress}
          />
          {formik.touched.progress && formik.errors.progress && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.progress}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition font-semibold"
          >
            {editIndex !== null ? "Update Progress" : "Add Progress"}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              className="w-full bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition font-semibold"
              onClick={() => {
                setEditIndex(null);
                formik.resetForm();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      {progressList.map((progress, index) => (
        <ProgressCard
          key={progress.id}
          progress={progress}
          onEdit={() => handleEdit(index)}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </div>
  );
};

export default LearningProgress;
