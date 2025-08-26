/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function daysFromNow(n) {
  return new Date(Date.now() + n * 24 * 60 * 60 * 1000);
}

async function main() {
  const center = await prisma.center.create({
    data: { name: "VNVC Can Tho", address: "Ninh Kieu, Can Tho" },
  });

  const hepB = await prisma.vaccine.create({
    data: {
      name: "Hepatitis B",
      manufacturer: "Acme Pharma",
      doses: 3,
      scheduleJson: { intervalsDays: [0, 30, 180] }
    }
  });

  await prisma.vaccineLot.createMany({
    data: [
      { vaccineId: hepB.id, lotNo: "HB-001", expiryDate: daysFromNow(90), quantity: 100, centerId: center.id },
      { vaccineId: hepB.id, lotNo: "HB-002", expiryDate: daysFromNow(30), quantity: 50, centerId: center.id }
    ]
  });

  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    create: { email: "admin@example.com", password: "$2a$10$JZkEq8M1sN8MBs3o/M3A/uB0u6Jt8NolAgk5wW3cxyenkQQA8D2a6", role: "ADMIN", name: "Admin" },
    update: {}
  });
  // password for the above hash: admin123

  console.log("Seed completed. Admin:", user.email);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
