import cloudinary from '../config/cloudinary.js';
import Book from '../models/material.model.js';
const uploadMaterial = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Upload file to Cloudinary
        const result =  cloudinary.uploader.upload_stream(
            { folder: 'study_materials', resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary Upload Error:', error);
                    return res.status(500).json({ error: 'File upload failed', err: error.message });
                }
                // Success response
                return res.status(200).json({ message: 'File uploaded successfully', result });
            }
        ).end(req.file.buffer); // Send buffer to Cloudinary

    } catch (err) {
        console.error('Controller Error:', err);
        res.status(500).json({ error: 'File upload failed', err: err.message });
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