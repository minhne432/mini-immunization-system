import { Router } from "express";
import auth from "../middlewares/auth.js";
import * as ctrl from "../controllers/lot.controller.js";
const r = Router();
r.use(auth);
r.get("/", ctrl.list);
r.post("/", ctrl.create);
r.get("/fefo", ctrl.fefo);
export default r;
