import { desc, sql } from "drizzle-orm";
import { SQLiteColumn } from "drizzle-orm/sqlite-core";
import { AppContext } from "site/apps/deco/records.ts";
import { AlbumProps } from "site/components/CoverSlider/AlbumItem.tsx";
import { albuns } from "site/db/schema.ts";

interface Props {
  language: "hiragana" | "romanji" | "english" | "portuguese";
  maxItems?: number;
}

const altCoverLang = {
  hiragana: "Capa de ",
  romanji: "Cover of ",
  english: "Cover of ",
  portuguese: "Capa de ",
};

/**
 * @title Records Loader
 */
export default async function loader(props: Props, _req: Request, ctx: AppContext): Promise<AlbumProps[]> {
  const titleCoverProp: Record<string, SQLiteColumn> = {
    hiragana: albuns.nameHiragana,
    romanji: albuns.nameRomaji,
    english: albuns.nameEnglish,
    portuguese: albuns.namePortuguese,
  };

  const { language, maxItems } = props;
  const titleColumn = titleCoverProp[language];
  const alt = altCoverLang[language];

  const drizzle = await ctx.invoke.records.loaders.drizzle();

  const albums = await drizzle
    .select({
      title: titleColumn,
      url: sql<string>`concat('/albuns/', ${albuns.id})`,
      cover: {
        source: albuns.image,
        alt: sql<string>`concat('${sql.raw(alt)}', ${titleColumn})`,
      },
    })
    .from(albuns)
    .limit(maxItems ?? 10)
    .orderBy(desc(albuns.releaseDate));

  return albums;
}
