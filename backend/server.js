import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import doctorRoute from './routes/doctorRoute.js';
import patientRoute from "./routes/patientRoute.js";
import appointmentRoutes from "./routes/appointmentRoute.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Test route
app.use("/api/auth", authRoute);

app.use('/api/doctors', doctorRoute);

app.use("/api/patients", patientRoute);

app.use("/api/appointments", appointmentRoutes);


app.get("/", (req, res) => {
  res.send("HMS Backend is running...");
});

// Start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));
