CREATE TABLE "albuns" (
	"id" text PRIMARY KEY NOT NULL,
	"name_romanji" text NOT NULL,
	"name_hiragana" text NOT NULL,
	"name_english" text NOT NULL,
	"name_portuguese" text NOT NULL,
	"image" text NOT NULL,
	"release_date" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lyrics" (
	"id" text PRIMARY KEY NOT NULL,
	"music_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lyrics_lines" (
	"id" text PRIMARY KEY NOT NULL,
	"lyrics_id" text NOT NULL,
	"position" integer NOT NULL,
	"start" integer NOT NULL,
	"end" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lyrics_lines_texts" (
	"id" text PRIMARY KEY NOT NULL,
	"lyrics_line_id" text NOT NULL,
	"language_id" text NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "musics" (
	"id" text PRIMARY KEY NOT NULL,
	"name_romanji" text NOT NULL,
	"name_hiragana" text NOT NULL,
	"name_english" text NOT NULL,
	"name_portuguese" text NOT NULL,
	"duration" integer NOT NULL,
	"youtube_video" text,
	"youtube_music_id" text,
	"spotify_id" text,
	"cover_url" text NOT NULL,
	"description" text,
	"release_date" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "musics_albums" (
	"music_id" text NOT NULL,
	"album_id" text NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lyrics" ADD CONSTRAINT "lyrics_music_id_musics_id_fk" FOREIGN KEY ("music_id") REFERENCES "public"."musics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lyrics_lines" ADD CONSTRAINT "lyrics_lines_lyrics_id_lyrics_id_fk" FOREIGN KEY ("lyrics_id") REFERENCES "public"."lyrics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lyrics_lines_texts" ADD CONSTRAINT "lyrics_lines_texts_lyrics_line_id_lyrics_lines_id_fk" FOREIGN KEY ("lyrics_line_id") REFERENCES "public"."lyrics_lines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lyrics_lines_texts" ADD CONSTRAINT "lyrics_lines_texts_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "musics_albums" ADD CONSTRAINT "musics_albums_music_id_musics_id_fk" FOREIGN KEY ("music_id") REFERENCES "public"."musics"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "musics_albums" ADD CONSTRAINT "musics_albums_album_id_albuns_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albuns"("id") ON DELETE no action ON UPDATE no action;