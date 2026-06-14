import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client.js";

let connectionString = `${process.env.DATABASE_URL}`;
if (connectionString.startsWith("postgresql://") && !connectionString.includes("?")) {
	connectionString += "?sslmode=require";
}

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

export { db };
