import Book from "../models/material.model.js";

const uploadMaterial = async (req, res) => {
    const { title, category, material} = req.body;

    try {
        const Upload = await Book.create({
            title,
            category,
            material,
            uploadedBy: req.user,
        });
        res.status(201).json({ Upload ,
            msg: "material added"
         });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 
const getMaterial = async (req, res) => {
    try {
        const materials = await Book.find().populate('uploadedBy', 'fullname','email');
        res.status(200).json({ materials });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { uploadMaterial, getMaterial};