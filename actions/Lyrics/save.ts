import { sql } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { lyrics, lyrics_lines, lyrics_lines_texts } from "site/db/schema.ts";
import { Lyrics } from "../../loaders/Lyrics/GetLyrics.ts";

interface Props {
  lyrics: Lyrics[];
}

export default async function action(props: Props, _req: Request, ctx: AppContext) {
  const lyricsProps = props.lyrics;
  const lyricsToInsert = lyricsProps.map((lyrics) => ({
    id: lyrics.id,
    musicId: lyrics.musicId,
  }));

  const linesToInsert = lyricsProps.flatMap((lyrics) =>
    lyrics.lines.map((line) => ({
      id: line.id,
      lyricsId: lyrics.id,
      position: line.position,
      start: line.start,
      end: line.end,
    }))
  );
  const textsToInsert = lyricsProps.flatMap((lyrics) =>
    lyrics.lines.flatMap((line) =>
      line.texts.map((text) => ({
        id: text.id,
        lyricsLineId: line.id,
        languageId: text.languageId,
        text: text.text,
      }))
    )
  );
  try {
    await ctx.drizzle.transaction(async (tx) => {
      await tx
        .insert(lyrics)
        .values(lyricsToInsert)
        .onConflictDoUpdate({
          target: lyrics.id,
          set: {
            musicId: sql`excluded.music_id`,
          },
        });
      await tx
        .insert(lyrics_lines)
        .values(linesToInsert)
        .onConflictDoUpdate({
          target: lyrics_lines.id,
          set: {
            lyricsId: sql`excluded.lyrics_id`,
            position: sql`excluded.position`,
            start: sql`excluded.start`,
            end: sql`excluded.end`,
          },
        });
      await tx
        .insert(lyrics_lines_texts)
        .values(textsToInsert)
        .onConflictDoUpdate({
          target: lyrics_lines_texts.id,
          set: {
            lyricsLineId: sql`excluded.lyrics_line_id`,
            languageId: sql`excluded.language_id`,
            text: sql`excluded.text`,
          },
        });
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
    };
  }
  return {
    success: true,
  };
}
