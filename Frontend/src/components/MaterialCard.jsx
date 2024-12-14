import React from "react";

const MaterialCard = ({ material }) => {
  return (
    <div className="bg-white shadow-lg rounded-md p-4">
      <h3 className="text-xl font-bold mb-2">{material.title}</h3>
      <p className="text-gray-700">Category: {material.category}</p>
      <p className="text-gray-600">{material.material[0]?.information || "No description"}</p>
      <a
        href={material.pdf_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline block mt-2"
      >
        View PDF
      </a>
    </div>
  );
};

export default MaterialCard;
