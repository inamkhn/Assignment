import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(new ErrorHandler(401,"Unauthorized")); 

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new ErrorHandler(401,"Forbidden")); 
    req.user = user;
    next();
  });
}

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resource`,
        403
      )
    );
  next();
};
