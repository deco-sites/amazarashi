import { defineConfig } from "drizzle-kit";

const user = Deno.env.get("DATABASE_USER") ?? "amazarashi";
const password = Deno.env.get("DATABASE_PASSWORD") ?? "amazarashi";
export const dbCredentials = {
  host: "selfhost.gui.dev.br",
  port: 5432,
  user,
  password,
  database: "amazarashi",
  ssl: false,
};

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials,
});
