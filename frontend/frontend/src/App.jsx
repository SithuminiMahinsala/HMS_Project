import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Placeholder components (We will build these next)
const Login = () => <div className="p-10 text-xl text-center">Login Page Coming Soon</div>;
const Register = () => <div className="p-10 text-xl text-center">Register Page Coming Soon</div>;
const PatientDashboard = () => <div className="p-10 text-xl text-center">Welcome to the Patient Dashboard</div>;
const DoctorDashboard = () => <div className="p-10 text-xl text-center">Welcome to the Doctor Dashboard</div>;

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div>
      {/* Toaster for global success/error popups */}
      <Toaster position="top-center" /> 
      
      <Routes>
        {/* Public Routes: If logged in, redirect to their specific dashboard */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${user.role}-dashboard`} />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to={`/${user.role}-dashboard`} />} />

        {/* Protected Routes: Check if user exists AND has the correct role */}
        <Route
          path="/patient-dashboard"
          element={user?.role === 'patient' ? <PatientDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/doctor-dashboard"
          element={user?.role === 'doctor' ? <DoctorDashboard /> : <Navigate to="/login" />}
        />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;