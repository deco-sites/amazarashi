import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { eq, sql } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { MusicInfoData } from "site/components/MusicInfo/index.tsx";
import { musics } from "site/db/schema.ts";
import { getAlbumCoverAlt, getAlbumTitleColumn, LanguagesTitles } from "site/utils/languagesTitles.ts";

interface Props {
  titleLanguage: LanguagesTitles;
  id: RequestURLParam;
}

/** @title Music Info Records Loader */
export default async function loader(props: Props, _req: Request, ctx: AppContext): Promise<MusicInfoData> {
  const { titleLanguage, id } = props;
  const titleColumn = getAlbumTitleColumn(titleLanguage);
  const altStr = getAlbumCoverAlt(titleLanguage);
  const drizzle = await ctx.invoke.records.loaders.drizzle();
  const [music] = await drizzle
    .select({
      title: sql<string>`${titleColumn}`,
      romanji: musics.nameRomaji,
      hiragana: musics.nameHiragana,
      english: musics.nameEnglish,
      portuguese: musics.namePortuguese,
      releaseDate: musics.releaseDate,
      cover: {
        url: musics.coverUrl,
        alt: sql<string>`concat('${sql.raw(altStr)}', ${titleColumn})`,
        isSquare: sql<boolean>`1`,
      },
      spotifyId: musics.spotifyId,
      youtubeMusicId: musics.youtubeMusicId,
    })
    .from(musics)
    .where(eq(musics.id, id))
    .limit(1);

  if (!music) {
    ctx.response.status = 307;
    ctx.response.headers.append("location", "/404");
    throw new Error(`Music not found: ${id}`);
  }

  return {
    ...music,
    releaseDate: Intl.DateTimeFormat("pt-BR").format(music.releaseDate).split("/").reverse().join("-"),
  };
}
