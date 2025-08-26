import { Router } from "express";
import auth from "../middlewares/auth.js";
import * as ctrl from "../controllers/doseRecord.controller.js";
const r = Router();
r.use(auth);
r.post("/", ctrl.create);
export default r;
