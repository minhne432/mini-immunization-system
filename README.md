# Mini Immunization System (Node.js + Express + Prisma + MySQL + Docker)

A minimal end‑to‑end starter to practice a real vaccine clinic flow: Patients, Vaccines, Lots (FEFO), Appointments, Dose Records, Auth (JWT).

## Quick start (Local)

1) Install dependencies
```bash
npm install
```

2) Create `.env` (copy from `.env.example`) and make sure MySQL is running locally or use Docker (below).

3) Initialize Prisma
```bash
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

API will run at `http://localhost:3000/`

## Quick start (Docker Compose)

```bash
docker compose up --build
```

This will start MySQL, Adminer (`http://localhost:8080`), and the API (`http://localhost:3000`).  
The API runs `npx prisma migrate deploy` on start.

## Postman collection
Import `docs/postman_collection.json` (if present) or call endpoints directly.

## Important Endpoints (MVP)

- `POST /api/auth/register`  → { name?, email, password, role? }
- `POST /api/auth/login`     → { email, password } returns `{ token }`

> Use `Authorization: Bearer <token>` for all private endpoints below.

- `GET  /api/patients` (paginated)  
- `POST /api/patients`

- `GET  /api/vaccines`  
- `POST /api/vaccines`

- `GET  /api/vaccine-lots`  
- `POST /api/vaccine-lots`  
- `GET  /api/vaccine-lots/fefo?vaccineId=1&centerId=1` (suggest FEFO lot)

- `POST /api/appointments` (WIP placeholder)  
- `POST /api/dose-records` (create record & decrement lot, basic transaction)

## Dev notes
- **FEFO** implemented as simple earliest non-expired lot with quantity > 0.
- **Schedule JSON** on `Vaccine.scheduleJson` can store intervals (days) between doses.
- JWT secret and Database URL are read from env. For Docker, env is injected in `docker-compose.yml`.

## ERD (simplified)
User(1)───(n)DoseRecord
Center(1)──(n)VaccineLot
Center(1)──(n)Patient
Center(1)──(n)Appointment
Patient(1)─(n)Appointment
Patient(1)─(n)DoseRecord
Vaccine(1)─(n)VaccineLot
Vaccine(1)─(n)Appointment
Vaccine(1)─(n)DoseRecord

---

This is a starter; expand validations, RBAC, audit logs, and error handling as needed.
