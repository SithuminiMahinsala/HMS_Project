import express from "express";
import Patient from "../models/patientModel.js";
import { protect, doctorOnly, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add patient (doctor or admin)
router.post("/", protect, async (req, res) => {
  try {
    const { name, email, age, address, phone } = req.body;
    const existing = await Patient.findOne({ email });
    if (existing) return res.status(400).json({ message: "Patient already exists" });

    const patient = await Patient.create({ name, email, age, address, phone });
    res.status(201).json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all patients (doctor or admin)
router.get("/", protect, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single patient
router.get("/:id", protect, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update patient info (doctor or admin)
router.put("/:id", protect, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
