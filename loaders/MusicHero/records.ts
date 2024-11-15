import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { eq } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { MusicHeroData } from "site/components/MusicHero/types.ts";
import { musics } from "site/db/schema.ts";

interface LoaderProps {
  musicId: string | RequestURLParam;
}

export default async function loader(props: LoaderProps, _req: Request, ctx: AppContext): Promise<MusicHeroData> {
  const { musicId } = props;
  const drizzle = await ctx.invoke.records.loaders.drizzle();

  const [heroData] = await drizzle
    .select({
      title: musics.nameRomaji,
      subtitle: musics.nameEnglish,
      backgroundImage: musics.coverUrl,
    })
    .from(musics)
    .where(eq(musics.id, musicId));

  if (!heroData) {
    ctx.response.status = 307;
    ctx.response.headers.append("location", "/404");
    throw new Error(`Music not found: ${musicId}`);
  }

  return heroData;
}
