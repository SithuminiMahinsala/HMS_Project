import express from "express";
import { bookAppointment, getMyAppointments, updateAppointmentStatus } from "../controllers/appointmentController.js";
import { protect, doctorOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book", protect, bookAppointment);
router.get("/my-appointments", protect, getMyAppointments);
router.patch("/update-status/:id", protect, doctorOnly, updateAppointmentStatus);

export default router;