ALTER TABLE "lyrics_lines" DROP COLUMN "start";--> statement-breakpoint
ALTER TABLE "lyrics_lines" DROP COLUMN "end";--> statement-breakpoint

ALTER TABLE "lyrics_lines" ADD "start" time(3) DEFAULT '00:00:00.000'::time;--> statement-breakpoint
ALTER TABLE "lyrics_lines" ADD "end" time(3) DEFAULT '00:00:00.000'::time;--> statement-breakpoint