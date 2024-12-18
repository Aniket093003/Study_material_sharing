import React from "react";

const MaterialCard = ({ name, category, pdfUrl }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600">Category: {category}</p>
      <div className="mt-4">
        <a
          href={pdfUrl}
          download
          className="text-blue-500 hover:text-blue-600 transition"
        >
          Download Material
        </a>
      </div>
    </div>
  );
};

export default MaterialCard;
