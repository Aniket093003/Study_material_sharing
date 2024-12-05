import Material from "../models/material.model.js";

const uploadMaterial = async (req, res) => {
    const { title, category, fileUrl} = req.body;

    try {
        const material = await Material.create({
            title,
            category,
            fileUrl,
            uploadedBy: req.user,
        });
        res.status(201).json({ material,
            msg: "material added"
         });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getMaterial = async (req, res) => {
    try {
        const materials = await Material.find().populate('uploadedBy', 'fullname','email');
        res.status(200).json({ materials });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { uploadMaterial, getMaterial};