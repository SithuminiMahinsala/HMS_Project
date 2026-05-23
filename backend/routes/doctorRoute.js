import express from "express";
import { getDoctors, getDoctorById, updateDoctorProfile } from "../controllers/doctorController.js";
import { protect, doctorOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public / Patient routes
router.get("/", getDoctors);
router.get("/:id", getDoctorById);

// Protected routes (Only logged-in doctors can update their profile)
router.post("/profile", protect, doctorOnly, updateDoctorProfile);

export default router;