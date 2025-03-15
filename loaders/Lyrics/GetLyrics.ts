import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { eq } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { lyrics, lyrics_lines, lyrics_lines_texts } from "site/db/schema.ts";

export interface Props {
  musicId: RequestURLParam;
}

export interface Line {
  id: string;
  position: number;
  texts: {
    id: string;
    languageId: string;
    text: string;
  }[];
  start: string;
  end: string;
}

export interface Lyrics {
  id: string;
  musicId: string;
  lines: Line[];
}

export default async function loader(props: Props, _req: Request, ctx: AppContext): Promise<Lyrics[]> {
  const lyricsReturned = await ctx.drizzle
    .select({
      id: lyrics.id,
    })
    .from(lyrics)
    .where(eq(lyrics.musicId, props.musicId));

  return await Promise.all(
    lyricsReturned.map(async (lyricReturned) => {
      const linesReturned = await ctx.drizzle
        .select({
          id: lyrics_lines.id,
          start: lyrics_lines.start,
          end: lyrics_lines.end,
          position: lyrics_lines.position,
        })
        .from(lyrics_lines)
        .where(eq(lyrics_lines.lyricsId, lyricReturned.id))
        .orderBy(lyrics_lines.position);
      return {
        id: lyricReturned.id,
        musicId: props.musicId,
        lines: await Promise.all(
          linesReturned.map(async (lineReturned) => {
            const textsReturned = await ctx.drizzle
              .select({
                id: lyrics_lines_texts.id,
                languageId: lyrics_lines_texts.languageId,
                text: lyrics_lines_texts.text,
              })
              .from(lyrics_lines_texts)
              .where(eq(lyrics_lines_texts.lyricsLineId, lineReturned.id));
            return {
              id: lineReturned.id,
              position: lineReturned.position,
              start: lineReturned.start,
              end: lineReturned.end,
              texts: textsReturned.map((textReturned) => ({
                id: textReturned.id,
                languageId: textReturned.languageId,
                text: textReturned.text,
              })),
            };
          })
        ),
      };
    })
  );
}
