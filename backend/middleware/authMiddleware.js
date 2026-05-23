import jwt from "jsonwebtoken";

// Protect middleware
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin-only middleware
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied: Admins only" });
  next();
};

// Doctor-only middleware
export const doctorOnly = (req, res, next) => {
  if (req.user.role !== "doctor")
    return res.status(403).json({ message: "Access denied: Doctors only" });
  next();
};
