import React, { useState } from "react";
import axios from "axios";

const UploadMaterial = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("tech");
  const [pdfUrl, setPdfUrl] = useState("");
  const [information, setInformation] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !pdfUrl || !information) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/material", {
        title,
        category,
        pdf_url: pdfUrl,
        material: [
          {
            name: title,
            format: "PDF",
            information,
          },
        ],
        isPublic,
      });

      setTitle("");
      setCategory("tech");
      setPdfUrl("");
      setInformation("");
      setIsPublic(true);
      setSuccessMessage("Material uploaded successfully!");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div
        className="bg-white p-6 rounded-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Material</h2>

        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="tech">Tech</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
            <option value="trading">Trading</option>
          </select>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            placeholder="Information"
            value={information}
            onChange={(e) => setInformation(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="mr-2"
            />
            <label>Make Material Public</label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full"
          >
            Upload Material
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadMaterial;
