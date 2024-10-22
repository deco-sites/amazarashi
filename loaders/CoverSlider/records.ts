import { desc, sql } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { CoverItemProps } from "site/components/CoverSlider/CoverItem.tsx";
import { albuns } from "site/db/schema.ts";
import { LanguagesTitles, getAlbumCoverAlt, getAlbumTitleColumn } from "site/loaders/utils/languagesTitles.ts";

interface Props {
  language: LanguagesTitles;
  maxItems?: number;
  albumPath: string;
}

/**
 * @title Albums Records Loader
 */
export default async function loader(props: Props, _req: Request, ctx: AppContext): Promise<CoverItemProps[]> {
  const { language, maxItems, albumPath } = props;

  const titleColumn = getAlbumTitleColumn(language);
  const alt = getAlbumCoverAlt(language);

  const drizzle = await ctx.invoke.records.loaders.drizzle();

  const albums = await drizzle
    .select({
      title: sql<string>`${titleColumn}`,
      url: sql<string>`concat('${sql.raw(albumPath)}', ${albuns.id})`,
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
