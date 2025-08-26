import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.route.js";
import patientRoutes from "./routes/patient.route.js";
import vaccineRoutes from "./routes/vaccine.route.js";
import lotRoutes from "./routes/lot.route.js";
import appointmentRoutes from "./routes/appointment.route.js";
import doseRecordRoutes from "./routes/doseRecord.route.js";

import error from "./middlewares/error.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, name: "Mini Immunization System" }));

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/vaccines", vaccineRoutes);
app.use("/api/vaccine-lots", lotRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/dose-records", doseRecordRoutes);

app.use(error);
export default app;
