CREATE TABLE `albuns` (
	`id` text PRIMARY KEY NOT NULL,
	`name_romanji` text NOT NULL,
	`name_hiragana` text NOT NULL,
	`name_english` text NOT NULL,
	`name_portuguese` text NOT NULL,
	`image` text NOT NULL,
	`release_date` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `musics` (
	`id` text PRIMARY KEY NOT NULL,
	`name_romanji` text NOT NULL,
	`name_hiragana` text NOT NULL,
	`name_english` text NOT NULL,
	`name_portuguese` text NOT NULL,
	`duration` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `musics_albums` (
	`music_id` text NOT NULL,
	`album_id` text NOT NULL,
	FOREIGN KEY (`music_id`) REFERENCES `musics`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`album_id`) REFERENCES `albuns`(`id`) ON UPDATE no action ON DELETE no action
);
