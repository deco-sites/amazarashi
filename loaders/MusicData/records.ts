import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { eq } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { MusicData } from "site/components/MusicData/types.ts";
import { musics } from "site/db/schema.ts";

interface LoaderProps {
  musicId: RequestURLParam;
}

export default async function loader(props: LoaderProps, _req: Request, ctx: AppContext): Promise<MusicData> {
  const { musicId } = props;
  const drizzle = await ctx.invoke.records.loaders.drizzle();

  const [musicData] = await drizzle
    .select({
      description: musics.description,
      videoId: musics.youtubeVideo,
    })
    .from(musics)
    .where(eq(musics.id, musicId));

  if (!musicData) {
    ctx.response.status = 307;
    ctx.response.headers.append("location", "/404");
    throw new Error(`Music not found: ${musicId}`);
  }

  return musicData;
}
