import { integer, pgTable, text, time, timestamp } from "drizzle-orm/pg-core";

export const albuns = pgTable("albuns", {
  id: text("id").primaryKey(),
  nameRomaji: text("name_romanji").notNull(),
  nameHiragana: text("name_hiragana").notNull(),
  nameEnglish: text("name_english").notNull(),
  namePortuguese: text("name_portuguese").notNull(),
  image: text("image").notNull(),
  releaseDate: timestamp("release_date", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const musics = pgTable("musics", {
  id: text("id").primaryKey(),
  nameRomaji: text("name_romanji").notNull(),
  nameHiragana: text("name_hiragana").notNull(),
  nameEnglish: text("name_english").notNull(),
  namePortuguese: text("name_portuguese").notNull(),
  duration: integer("duration").notNull(),
  youtubeVideo: text("youtube_video"),
  youtubeMusicId: text("youtube_music_id"),
  spotifyId: text("spotify_id"),
  coverUrl: text("cover_url").notNull(),
  description: text("description"),
  releaseDate: timestamp("release_date", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const musics_albums = pgTable("musics_albums", {
  musicId: text("music_id")
    .references(() => musics.id)
    .notNull(),
  albumId: text("album_id")
    .references(() => albuns.id)
    .notNull(),
  position: integer("position").notNull(),
});

export const languages = pgTable("languages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const lyrics = pgTable("lyrics", {
  id: text("id").primaryKey(),
  musicId: text("music_id")
    .references(() => musics.id)
    .notNull(),
});

export const lyrics_lines = pgTable("lyrics_lines", {
  id: text("id").primaryKey(),
  lyricsId: text("lyrics_id")
    .references(() => lyrics.id)
    .notNull(),
  position: integer("position").notNull(),
  start: time("start", { withTimezone: false, precision: 3 }).notNull().defaultNow(),
  end: time("end", { withTimezone: false, precision: 3 }).notNull().defaultNow(),
});

export const lyrics_lines_texts = pgTable("lyrics_lines_texts", {
  id: text("id").primaryKey(),
  lyricsLineId: text("lyrics_line_id")
    .references(() => lyrics_lines.id)
    .notNull(),
  languageId: text("language_id")
    .references(() => languages.id)
    .notNull(),
  text: text("text").notNull(),
});
