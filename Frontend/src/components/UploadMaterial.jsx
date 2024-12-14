import React, { useState } from "react";

const UploadMaterialForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("tech");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAvatar, setBookAvatar] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!title || !category || !bookTitle || !bookAvatar || !pdfFile) {
      setErrorMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("bookTitle", bookTitle);
    formData.append("bookAvatar", bookAvatar);
    formData.append("isPublic", isPublic);
    formData.append("pdf", pdfFile); // Attach the PDF file here

    try {
      const token = localStorage.getItem("token"); // Assuming the token is saved in localStorage

      const response = await fetch("http://localhost:5000/materials/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token in Authorization header
        },
        body: formData, // Send form data
      });

      const result = await response.json();

      if (response.ok) {
        alert("Material uploaded successfully!");
        setTitle("");
        setCategory("tech");
        setBookTitle("");
        setBookAvatar("");
        setPdfFile(null);
        setIsPublic(true);
        setErrorMessage(""); // Clear error
      } else {
        setErrorMessage(result.error || "An error occurred.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again.");
    }
  };

  return (
    <div>
      <h2>Upload Material</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="tech">Tech</option>
            <option value="health">Health</option>
            <option value="finance">Finance</option>
            <option value="trading">Trading</option>
          </select>
        </div>

        <div>
          <label>Book Title</label>
          <input
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Book Avatar (URL)</label>
          <input
            type="text"
            value={bookAvatar}
            onChange={(e) => setBookAvatar(e.target.value)}
            required
          />
        </div>

        <div>
          <label>PDF File</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            Make Material Public
          </label>
        </div>

        {errorMessage && <div className="error">{errorMessage}</div>}

        <button type="submit">Upload Material</button>
      </form>
    </div>
  );
};

export default UploadMaterialForm;
