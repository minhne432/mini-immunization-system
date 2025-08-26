import { Router } from "express";
import auth from "../middlewares/auth.js";
import * as ctrl from "../controllers/appointment.controller.js";
const r = Router();
r.use(auth);
r.get("/", ctrl.list);
r.post("/", ctrl.create);
export default r;
