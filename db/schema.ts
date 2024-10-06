/**
 * The code snippet below is an example.
 */

/**
* import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email"),
});
*/

import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const albuns = sqliteTable("albuns", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
});

export const tracks = sqliteTable("tracks", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  duration: text("duration").notNull(),
  album_id: text("album_id")
    .notNull()
    .references(() => albuns.id),
});
