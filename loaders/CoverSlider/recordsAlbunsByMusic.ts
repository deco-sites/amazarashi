import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { desc, eq, sql } from "drizzle-orm";
import { inArray } from "drizzle-orm/expressions";
import { AppContext } from "site/apps/site.ts";
import { CoverItemProps } from "site/components/CoverSlider/CoverItem.tsx";
import { albuns, musics_albums } from "site/db/schema.ts";
import { getAlbumCoverAlt, getAlbumTitleColumn, LanguagesTitles } from "site/utils/languagesTitles.ts";

interface Props {
  language: LanguagesTitles;
  maxItems?: number;
  albumPath: string;
  musicId: RequestURLParam;
}

/** @title Music List Records Loader */
export default async function loader(props: Props, _req: Request, ctx: AppContext): Promise<CoverItemProps[]> {
  const { language, maxItems, albumPath, musicId } = props;

  const titleColumn = getAlbumTitleColumn(language);
  const alt = getAlbumCoverAlt(language);

  const albunsIds = await ctx.drizzle
    .select({
      id: musics_albums.albumId,
    })
    .from(musics_albums)
    .where(eq(musics_albums.musicId, musicId));

  const albums = await ctx.drizzle
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
    .where(
      inArray(
        albuns.id,
        albunsIds.map((album) => album.id)
      )
    )
    .orderBy(desc(albuns.releaseDate));

  return albums;
}
