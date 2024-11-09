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

export const musics = sqliteTable("musics", {
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
});

export const musics_albums = sqliteTable("musics_albums", {
  musicId: text("music_id")
    .references(() => musics.id)
    .notNull(),
  albumId: text("album_id")
    .references(() => albuns.id)
    .notNull(),
  position: integer("position").notNull(),
});
