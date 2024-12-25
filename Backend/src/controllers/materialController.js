import Book from '../models/material.model.js';

const uploadMaterial = async (req, res) => {
    try {
      const { title, description, category } = req.body;
      const file = req.file.path; // Cloudinary file URL
  
      const newMaterial = new Book({
        title,
        description,
        category,
        file,
      });
  
      await newMaterial.save();
      res.status(201).json({ message: 'Material uploaded successfully', Book: newMaterial });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload material' });
    }
  };
  
const getMaterials = async (req, res) => {
    try {
        const materials = await Book.find();
        res.json(materials);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch materials' });
    }
};
export {getMaterials, uploadMaterial}