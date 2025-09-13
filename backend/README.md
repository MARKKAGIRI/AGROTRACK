# 🌱 AgroTrack+ Backend

This is the backend for **AgroTrack+**, built with **Express.js**, **Prisma ORM**, and **PostgreSQL (Neon)**.  
It powers the mobile app (React Native).

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
2. Install dependencies
bash
Copy code
npm install
3. Environment variables
Copy the example file:

bash
Copy code
cp .env.example .env
Add the shared Neon PostgreSQL connection string in .env:

env
Copy code
DATABASE_URL="postgresql://<user>:<password>@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
PORT=5000
⚠️ Do not commit your .env file.

4. Prisma setup
Generate the Prisma client:

bash
Copy code
npx prisma generate
If syncing with the shared Neon database:

bash
Copy code
npx prisma db pull
npx prisma generate
5. Run the server
bash
Copy code
npm run dev
or

bash
Copy code
node index.js
You should see:

arduino
Copy code
Server running on port 5000
🗂 Project Structure
bash
Copy code
backend/
├── prisma/
│   ├── schema.prisma       # Prisma schema (models & relations)
│   └── migrations/         # Database migrations
│
├── src/
│   ├── config/
│   │   └── db.js           # Prisma client instance
│   ├── routes/
│   │   └── index.js        # API routes
│   ├── controllers/        # Route handlers (future)
│   ├── middlewares/        # Middleware (auth, validation, etc.)
│   └── app.js              # Express app setup
│
├── .env                    # Local environment variables (ignored by Git)
├── .env.example            # Example env file for teammates
├── index.js                # Entry point (runs Express server)
├── package.json
└── README.md
👥 Collaboration Notes
All devs share the same Neon database. Changes are reflected instantly.

If schema changes are needed:

Update prisma/schema.prisma

Run:

bash
Copy code
npx prisma migrate dev --name <migration-name>
Push changes to Git

Teammates run:

bash
Copy code
npx prisma db pull
npx prisma generate
Optionally, each dev can create their own Neon DB branch and use a different DATABASE_URL.

📌 Requirements
Node.js 18+

NPM

Neon account (for DB access)