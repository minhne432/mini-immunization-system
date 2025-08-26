import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export default function auth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    req.user = jwt.verify(token, env.jwtSecret);
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
