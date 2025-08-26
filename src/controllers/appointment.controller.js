import { prisma } from "../db/prisma.js";
import { z } from "zod";

const createSchema = z.object({
  patientId: z.number().int(),
  vaccineId: z.number().int(),
  doseNo: z.number().int(),
  centerId: z.number().int(),
  apptAt: z.string().transform((s) => new Date(s)),
  notes: z.string().optional(),
});

export async function create(req, res, next) {
  try {
    const data = createSchema.parse(req.body);
    const appt = await prisma.appointment.create({ data });
    res.status(201).json(appt);
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const items = await prisma.appointment.findMany({
      include: { patient: true, vaccine: true, center: true },
      orderBy: { apptAt: "asc" },
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
}
