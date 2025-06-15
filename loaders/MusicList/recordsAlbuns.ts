import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { asc, eq, sql } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { MusicListItem } from "site/components/MusicList/index.tsx";
import { musics, musics_albums } from "site/db/schema.ts";

interface LoaderProps {
  /** @title Album ID */
  albumId: string | RequestURLParam;
}

/** @title Music List Records Loader */
export default async function loader(props: LoaderProps, _req: Request, ctx: AppContext): Promise<MusicListItem[]> {
  const { albumId } = props;

  const musicsResponse = await ctx.drizzle
    .select({
      id: musics.id,
      name: sql<string>`concat(${musics.nameRomaji}, ' - ', ${musics.nameEnglish})`,
      duration: musics.duration,
      youtubeMusicId: musics.youtubeMusicId,
      spotifyId: musics.spotifyId,
      url: sql<string>`concat('/music/', ${musics.id})`,
      position: musics_albums.position,
    })
    .from(musics_albums)
    .leftJoin(musics, eq(musics_albums.musicId, musics.id))
    .where(eq(musics_albums.albumId, albumId))
    .orderBy(asc(musics_albums.position));

  return musicsResponse.map((music) => ({
    id: music.id ?? "",
    position: music.position,
    name: music.name,
    duration: music.duration ?? 0,
    youtubeMusicId: music.youtubeMusicId ?? undefined,
    spotifyId: music.spotifyId ?? undefined,
    url: music.url,
  }));
}
