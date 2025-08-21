import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
      return res.status(401).json({ message: "Not Authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not Found" });
    }
    next();
  } catch (error) {
    console.error("Error: ", error.message);
    res.status(401).json({ message: "Not Authorized, token failed" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Not Authorized , only Admin access required" });
  }
};
