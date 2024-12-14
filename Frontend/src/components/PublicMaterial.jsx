import React, { useState, useEffect } from "react";

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
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
        setErrorMessage(result.error || "Failed to fetch materials");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again.");
    }
  };

  return (
    <div>
      <h2>Materials</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <ul>
        {materials.map((material) => (
          <li key={material._id}>
            <h3>{material.title}</h3>
            <p>{material.category}</p>
            <p>Uploaded by: {material.uploadedBy.name}</p>
            <a href={material.book[0].pdf} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialList;
