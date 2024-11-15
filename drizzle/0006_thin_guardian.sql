CREATE TABLE `music_lyrics` (
	`music_id` text NOT NULL,
	`portuguese` text NOT NULL,
	`romanji` text NOT NULL,
	`hiragana` text NOT NULL,
	`english` text NOT NULL,
	`position` integer NOT NULL,
	`start` integer NOT NULL,
	`end` integer NOT NULL,
	FOREIGN KEY (`music_id`) REFERENCES `musics`(`id`) ON UPDATE no action ON DELETE no action
);
