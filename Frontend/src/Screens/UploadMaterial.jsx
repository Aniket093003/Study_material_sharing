import React, { useState } from "react";
import axios from "axios";

const UploadMaterial = () => {
  const [file, setFile] = useState(null); // For the selected file
  const [name, setName] = useState(""); // Name of the material
  const [category, setCategory] = useState(""); // Category selection
  const [message, setMessage] = useState(""); // Success/error messages
  const [loading, setLoading] = useState(false); // Upload progress
  const [modalOpen, setModalOpen] = useState(false); // Modal open state

  const categories = ["Technology", "Health", "Finance", "Trading"]; // Category options

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!file || !name || !category) {
      setMessage("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("category", category);

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:4000/api/material/upload",
        formData
      );

      setMessage("File uploaded successfully!");
      console.log(response.data);
      setFile(null);
      setName("");
      setCategory("");
      setModalOpen(false); // Close modal on success
    } catch (error) {
      setMessage("File upload failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Upload Material
      </button>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-lg"
            onClick={(e) => e.stopPropagation()} // Prevent click event propagation inside modal
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Material Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Material Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter material name"
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Select Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                  required
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* File Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload File
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full border p-2 rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload Material"}
              </button>

              {/* Message */}
              {message && (
                <p
                  className={`mt-4 text-center ${
                    message.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMaterial;
