import express from "express";
import authUser from "../middleware/authMiddleware.js";
import { uploadMaterial, getMaterial } from "../controllers/materialController.js";
const materialRouter = express.Router();

materialRouter.post('/upload', authUser, uploadMaterial);
materialRouter.get('/get', authUser, getMaterial);

export default materialRouter;