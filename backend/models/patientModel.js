import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, required: true },
  address: { type: String },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Patient", patientSchema);
