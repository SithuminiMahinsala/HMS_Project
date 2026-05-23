import Appointment from "../models/appointmentModel.js";

// @desc    Book an appointment
// @route   POST /api/appointments/book
// @access  Private (Patient only)
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const patientId = req.user.id; // From auth middleware

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      date,
      time
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment requested successfully", newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }
};

// @desc    Get user's appointments (Patient or Doctor)
// @route   GET /api/appointments/my-appointments
// @access  Private
export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    let query = {};
    if (role === "patient") {
      query = { patientId: userId };
    } else if (role === "doctor") {
      query = { doctorId: userId };
    }

    const appointments = await Appointment.find(query)
      .populate("patientId", "name")
      .populate("doctorId", "name");
      
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/update-status/:id
// @access  Private (Doctor only)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body; // e.g., 'approved' or 'rejected'
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: "Status updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};