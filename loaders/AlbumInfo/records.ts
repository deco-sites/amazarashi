import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { eq, sql } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { AlbumInfoData } from "site/components/AlbumInfo/index.tsx";
import { albuns } from "site/db/schema.ts";
import { getAlbumCoverAlt, getAlbumTitleColumn, LanguagesTitles } from "site/loaders/utils/languagesTitles.ts";

interface Props {
  titleLanguage: LanguagesTitles;
  id: RequestURLParam;
}

/**
 * @title Album Info Records Loader
 */
export default async function loader(props: Props, _req: Request, ctx: AppContext): Promise<AlbumInfoData> {
  const { titleLanguage, id } = props;
  console.log({ props });
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

  return {
    ...album,
    releaseDate: Intl.DateTimeFormat("pt-BR").format(album.releaseDate).split("/").reverse().join("-"),
  };
}
