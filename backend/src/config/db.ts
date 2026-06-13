import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connection = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(connection);
const basePrisma = new PrismaClient({ adapter });

export const prisma = basePrisma.$extends({
  query: {
    user: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async findFirst({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async findUnique({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async count({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
    },
    properti: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async findFirst({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async findUnique({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async count({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
    },
    kamar: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async findFirst({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async findUnique({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async count({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
    },
    operator: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async findFirst({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async findUnique({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
      async count({ args, query }) {
        args.where = { ...args.where, deleted_at: null };
        return query(args);
      },
    },
  },
});

