import { prisma } from "../db/prisma.js";
import { z } from "zod";

const createSchema = z.object({
  name: z.string(),
  manufacturer: z.string().optional(),
  doses: z.number().int().optional(),
  scheduleJson: z.any().optional(),
});

export async function create(req, res, next) {
  try {
    const data = createSchema.parse(req.body);
    const vaccine = await prisma.vaccine.create({ data });
    res.status(201).json(vaccine);
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const items = await prisma.vaccine.findMany({ orderBy: { id: "desc" } });
    res.json(items);
  } catch (err) {
    next(err);
  }
}
