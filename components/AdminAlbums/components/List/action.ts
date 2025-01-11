import { desc, like } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { ComponentProps } from "site/components/AdminAlbums/components/List/types.ts";
import { albuns } from "site/db/schema.ts";

export default async function action(_props: unknown, req: Request, ctx: AppContext): Promise<ComponentProps> {
  await ctx.invoke.site.loaders.AdminLogin.index();
  const formData = await req.formData();
  const queryEntry = formData.get("query");
  const query = queryEntry ? queryEntry?.toString().trim() : "";
  if (query === "") {
    return {
      result: "wait for search",
    };
  }
  const drizzle = await ctx.invoke.records.loaders.drizzle();
  const albumsResult = await drizzle
    .select({
      name: albuns.nameRomaji,
      id: albuns.id,
      image: albuns.image,
    })
    .from(albuns)
    .where(like(albuns.nameRomaji, `%${query}%`))
    .orderBy(desc(albuns.releaseDate));

  if (albumsResult.length === 0) {
    return {
      result: "no results",
    };
  }

  return {
    result: albumsResult,
  };
}
