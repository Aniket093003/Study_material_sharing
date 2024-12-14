import React, { useEffect, useState } from "react";
import axios from "axios";

const MyLibrary = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        alert("Please login first.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:4000/api/materials/my-library",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMaterials(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user materials", error);
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <div>
      <h1>My Uploaded Materials</h1>
      {loading ? (
        <p>Loading materials...</p>
      ) : materials.length === 0 ? (
        <p>You haven't uploaded any materials yet.</p>
      ) : (
        materials.map((material) => (
          <div key={material._id} className="material-card">
            <h2>{material.title}</h2>
            <p>Category: {material.category}</p>
            {material.book.map((b, index) => (
              <div key={index}>
                <h3>{b.title}</h3>
                <img src={b.avatar} alt="Book Avatar" width={50} />
                <a href={b.pdf} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyLibrary;
