import React, { useState, useEffect } from "react";

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    setLoading(true); // Show loading state while fetching
    try {
      const token = localStorage.getItem("token");

      // Fetch public materials
      const response = await fetch("http://localhost:4000/material/public", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        setMaterials(result);
      } else {
        setErrorMessage(result.error || "Failed to fetch materials.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again.");
    } finally {
      setLoading(false); // Hide loading state after fetching
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Materials</h2>
      
      {/* Error Message */}
      {errorMessage && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
          {errorMessage}
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading materials...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Display Materials */}
        {materials.length > 0 ? (
          materials.map((material) => (
            <div key={material._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800">{material.title}</h3>
              <p className="text-gray-600">Category: {material.category}</p>
              <p className="text-gray-600">Uploaded by: {material.uploadedBy.name}</p>
              <div className="mt-4">
                <a
                  href={material.book[0].pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition"
                >
                  View PDF
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No materials available.</p>
        )}
      </div>
    </div>
  );
};

export default MaterialList;
