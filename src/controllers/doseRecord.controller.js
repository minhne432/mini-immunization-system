import { prisma } from "../db/prisma.js";
import { z } from "zod";

const createSchema = z.object({
  patientId: z.number().int(),
  vaccineId: z.number().int(),
  doseNo: z.number().int(),
  centerId: z.number().int(),
  lotId: z.number().int(),
  notes: z.string().optional(),
  adverseEventJson: z.any().optional(),
  quantityUsed: z.number().int().optional().default(1),
});

export async function create(req, res, next) {
  try {
    const data = createSchema.parse(req.body);

    const result = await prisma.$transaction(async (tx) => {
      const lot = await tx.vaccineLot.findUnique({ where: { id: data.lotId } });
      if (!lot) throw Object.assign(new Error("Lot not found"), { status: 404 });
      if (lot.vaccineId !== data.vaccineId) throw Object.assign(new Error("Lot-vaccine mismatch"), { status: 400 });
      if (lot.centerId !== data.centerId) throw Object.assign(new Error("Lot-center mismatch"), { status: 400 });
      if (lot.quantity < data.quantityUsed) throw Object.assign(new Error("Insufficient lot quantity"), { status: 400 });

      await tx.vaccineLot.update({
        where: { id: lot.id },
        data: { quantity: { decrement: data.quantityUsed } },
      });

      const rec = await tx.doseRecord.create({
        data: {
          patientId: data.patientId,
          vaccineId: data.vaccineId,
          doseNo: data.doseNo,
          centerId: data.centerId,
          lotId: data.lotId,
          notes: data.notes || null,
          adverseEventJson: data.adverseEventJson || null,
        },
      });
      return rec;
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
