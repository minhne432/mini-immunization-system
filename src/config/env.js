import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "devsecret",
  nodeEnv: process.env.NODE_ENV || "development",
};
