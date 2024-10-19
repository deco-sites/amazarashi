CREATE TABLE `albuns` (
	`id` text PRIMARY KEY NOT NULL,
	`name_romanji` text NOT NULL,
	`name_hiragana` text NOT NULL,
	`name_english` text NOT NULL,
	`name_portuguese` text NOT NULL,
	`image` text NOT NULL,
	`release_date` integer NOT NULL
);
