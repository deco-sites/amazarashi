import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const albuns = sqliteTable("albuns", {
  id: text("id").primaryKey(),
  nameRomaji: text("name_romanji").notNull(),
  nameHiragana: text("name_hiragana").notNull(),
  nameEnglish: text("name_english").notNull(),
  namePortuguese: text("name_portuguese").notNull(),
  image: text("image").notNull(),
  releaseDate: integer("release_date", {
    mode: "timestamp",
  }).notNull(),
});
