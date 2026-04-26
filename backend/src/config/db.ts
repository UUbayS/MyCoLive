import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connection = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(connection);
export const prisma = new PrismaClient({ adapter });
