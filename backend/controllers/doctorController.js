import Doctor from "../models/doctorModel.js";
import User from "../models/usermodel.js";

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public / Protected (Patients & Admins)
export const getDoctors = async (req, res) => {
  try {
    // .populate() pulls the 'name' and 'email' from the linked User document
    const doctors = await Doctor.find().populate("userId", "name email");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server error: Failed to fetch doctors", error: error.message });
  }
};

// @desc    Get a single doctor by ID
// @route   GET /api/doctors/:id
// @access  Public / Protected
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("userId", "name email");
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error: Failed to fetch doctor", error: error.message });
  }
};

// @desc    Create or Update Doctor Profile
// @route   POST /api/doctors/profile
// @access  Private (Doctor only)
export const updateDoctorProfile = async (req, res) => {
  try {
    // req.user.id is set by your protect middleware
    const userId = req.user.id; 
    const { specialization, experience, fees, availableTimeSlots } = req.body;

    // Check if the doctor profile already exists
    let doctor = await Doctor.findOne({ userId });

    if (doctor) {
      // Update existing profile
      doctor.specialization = specialization || doctor.specialization;
      doctor.experience = experience || doctor.experience;
      doctor.fees = fees || doctor.fees;
      doctor.availableTimeSlots = availableTimeSlots || doctor.availableTimeSlots;

      const updatedDoctor = await doctor.save();
      return res.status(200).json({ message: "Profile updated successfully", updatedDoctor });
    } else {
      // Create new profile if it doesn't exist
      const newDoctor = new Doctor({
        userId,
        specialization,
        experience,
        fees,
        availableTimeSlots
      });

      const savedDoctor = await newDoctor.save();
      return res.status(201).json({ message: "Profile created successfully", savedDoctor });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: Failed to update profile", error: error.message });
  }
};