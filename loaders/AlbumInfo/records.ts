import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { eq, sql } from "drizzle-orm";
import { FinalAppContext } from "site/apps/site.ts";
import { AlbumInfoData } from "site/components/AlbumInfo/index.tsx";
import { albuns } from "site/db/schema.ts";
import { getAlbumCoverAlt, getAlbumTitleColumn, LanguagesTitles } from "site/utils/languagesTitles.ts";

interface Props {
  titleLanguage: LanguagesTitles;
  id: RequestURLParam;
}

/** @title Album Info Records Loader */
export default async function loader(props: Props, _req: Request, ctx: FinalAppContext): Promise<AlbumInfoData> {
  const { titleLanguage, id } = props;
  const titleColumn = getAlbumTitleColumn(titleLanguage);
  const altStr = getAlbumCoverAlt(titleLanguage);
  const drizzle = await ctx.invoke.records.loaders.drizzle();
  const [album] = await drizzle
    .select({
      title: sql<string>`${titleColumn}`,
      romanji: albuns.nameRomaji,
      hiragana: albuns.nameHiragana,
      english: albuns.nameEnglish,
      portuguese: albuns.namePortuguese,
      releaseDate: albuns.releaseDate,
      cover: {
        url: albuns.image,
        alt: sql<string>`concat('${sql.raw(altStr)}', ${titleColumn})`,
      },
    })
    .from(albuns)
    .where(eq(albuns.id, id))
    .limit(1);

  if (!album) {
    ctx.response.status = 307;
    ctx.response.headers.append("location", "/404");
    throw new Error(`Album not found: ${id}`);
  }

  return {
    ...album,
    releaseDate: Intl.DateTimeFormat("pt-BR").format(album.releaseDate).split("/").reverse().join("-"),
  };
}
