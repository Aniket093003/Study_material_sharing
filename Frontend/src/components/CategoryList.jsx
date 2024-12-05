import React from "react";

const categories = [
  { name: "Technology", icon: "💻" },
  { name: "Health", icon: "🩺" },
  { name: "Finance", icon: "💰" },
  { name: "Trading", icon: "📈" },
];

const CategoryList = () => {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Explore Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 text-center rounded-md shadow-md hover:bg-gray-200"
          >
            <div className="text-3xl">{category.icon}</div>
            <h3 className="text-lg font-semibold mt-2">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
