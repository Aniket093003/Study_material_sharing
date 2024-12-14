import express from 'express';
import { uploadMaterial, getMaterial, MyLibrary } from '../controllers/materialController.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Assuming you have an auth middleware for JWT auth
import multer from 'multer';

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// Route for uploading a material
router.post('/upload', authMiddleware, upload.single('pdf'), uploadMaterial);

// Route for fetching public materials
router.get('/public', getMaterial);

// Route for fetching materials uploaded by the logged-in user
router.get('/my-library', authMiddleware, MyLibrary);

export default router;
