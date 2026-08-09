# RAKSHITA

Wear. Detect. Protect.

RAKSHITA is a low-cost wearable safety and emergency-response prototype. A bracelet or simulator sends health, activity, device, and location signals to the backend. The backend stores telemetry, evaluates configurable prototype rules, creates potential emergency events, and records mock alerts for trusted contacts.

## Problem

People may not receive timely help after accidents or sudden emergencies because their condition and location are not communicated quickly.

## Solution

RAKSHITA connects a wearable bracelet, app, backend API, PostgreSQL database, emergency detection rules, and trusted-contact alert workflow.

```text
Wearable Bracelet -> App -> Backend -> PostgreSQL -> Emergency Detection -> Alerts
```

## Tech Stack

- Backend: Node.js, Express.js, JavaScript
- Database: PostgreSQL with Prisma ORM
- Auth: JWT and bcrypt password hashing
- Validation: Zod
- Security/dev utilities: dotenv, CORS, Helmet, rate limiting
- Tests: Jest and Supertest
- Frontend contract: React + Vite can consume the REST APIs

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

On Windows PowerShell, create `.env` with:

```powershell
Copy-Item .env.example .env
```

## PostgreSQL Setup

Create a PostgreSQL database named `rakshita`, then update `backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rakshita?schema=public"
JWT_SECRET="replace-with-a-long-random-development-secret"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
BCRYPT_SALT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=150
```

Demo seed credentials:

```text
Email: demo@rakshita.local
Password: DemoPass123!
```

These credentials are development/demo data only.

## API Endpoints

Base URL: `http://localhost:5000/api`

Auth:

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

User:

- `GET /users/me`
- `PATCH /users/me`

Contacts:

- `GET /contacts`
- `POST /contacts`
- `PATCH /contacts/:id`
- `DELETE /contacts/:id`

Health:

- `POST /health/readings`
- `GET /health/readings`
- `GET /health/latest`

Location:

- `POST /location`
- `GET /location/latest`
- `GET /location/history`

Devices:

- `POST /devices`
- `GET /devices`
- `PATCH /devices/:id`

Emergency:

- `POST /emergency/simulate`
- `GET /emergency`
- `GET /emergency/:id`
- `POST /emergency/:id/cancel`
- `POST /emergency/:id/resolve`
- `POST /emergency/:id/escalate`

## Emergency Simulation

Authenticated request:

```json
{
  "type": "COMBINED_EMERGENCY",
  "impactDetected": true,
  "userResponded": false
}
```

Supported simulation types:

- `ACCIDENT`
- `LOW_SPO2`
- `ABNORMAL_HEART_RATE`
- `COMBINED_EMERGENCY`

The backend combines latest health readings, latest location, impact simulation, and user response simulation. It creates a potential emergency event and mock alert records for trusted contacts.

## Response Format

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

## Tests

Tests require a PostgreSQL test database through `DATABASE_URL`.

```bash
cd backend
npm test
```

## Disclaimer

RAKSHITA is an 8-hour hackathon MVP and is not a certified medical device. It does not provide medical diagnoses, does not replace professional care, and does not contact real ambulance, police, hospital, or emergency services unless a real integration is explicitly added later.
