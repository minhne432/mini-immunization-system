import { prisma } from "../db/prisma.js";
import { z } from "zod";

const createSchema = z.object({
  fullName: z.string(),
  dob: z.string().transform((s) => new Date(s)),
  sex: z.string(),
  phone: z.string(),
  guardianName: z.string().optional(),
  centerId: z.number().int().optional(),
});

export async function create(req, res, next) {
  try {
    const data = createSchema.parse(req.body);
    const patient = await prisma.patient.create({ data: { ...data, createdById: req.user?.sub || null } });
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const page = parseInt(req.query.page || "1", 10);
    const pageSize = parseInt(req.query.pageSize || "10", 10);
    const skip = (page - 1) * pageSize;
    const [total, items] = await Promise.all([
      prisma.patient.count(),
      prisma.patient.findMany({ skip, take: pageSize, orderBy: { id: "desc" } }),
    ]);
    res.json({ total, page, pageSize, items });
  } catch (err) {
    next(err);
  }
}
