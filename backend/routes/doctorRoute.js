import express from 'express';
import Doctor from '../models/doctorModel.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';


const router = express.Router();

// Add a doctor (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { name, email, phone, specialization } = req.body;
    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Doctor already exists' });

    const doctor = await Doctor.create({ name, email, phone, specialization });
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all doctors
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update doctor
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Activate / Deactivate doctor
router.patch('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    doctor.status = doctor.status === 'active' ? 'inactive' : 'active';
    await doctor.save();
    res.json({ message: `Doctor is now ${doctor.status}`, doctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
