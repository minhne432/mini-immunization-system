import { prisma } from "../db/prisma.js";
import { z } from "zod";
import { pickFefo } from "../utils/fefo.js";

const createSchema = z.object({
  vaccineId: z.number().int(),
  lotNo: z.string(),
  expiryDate: z.string().transform((s) => new Date(s)),
  quantity: z.number().int(),
  centerId: z.number().int(),
});

export async function create(req, res, next) {
  try {
    const data = createSchema.parse(req.body);
    const lot = await prisma.vaccineLot.create({ data });
    res.status(201).json(lot);
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const items = await prisma.vaccineLot.findMany({
      include: { vaccine: true, center: true },
      orderBy: { expiryDate: "asc" },
    });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function fefo(req, res, next) {
  try {
    const vaccineId = parseInt(req.query.vaccineId || "0", 10);
    const centerId = parseInt(req.query.centerId || "0", 10);
    const lots = await prisma.vaccineLot.findMany({
      where: { vaccineId, centerId },
      orderBy: { expiryDate: "asc" },
    });
    const best = pickFefo(lots);
    res.json({ suggestion: best });
  } catch (err) {
    next(err);
  }
}
