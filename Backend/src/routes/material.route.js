import express from "express"
import  upload  from "../config/multerConfig.js";
import { uploadMaterial, getMaterials } from '../controllers/materialController.js';
import authUser from "../middleware/authMiddleware.js"
const materialRouter = express.Router();

materialRouter.post('/upload', authUser, upload.single('file'), uploadMaterial);
materialRouter.get('/', getMaterials);

export default materialRouter;