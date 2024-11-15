import { renderTemplateString, Props as SEOProps } from "apps/website/components/Seo.tsx";
import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { eq, sql } from "drizzle-orm";
import { FinalAppContext } from "site/apps/site.ts";
import { albuns } from "site/db/schema.ts";
import { getAlbumTitleColumn, LanguagesTitles } from "site/utils/languagesTitles.ts";

interface Props {
  id: RequestURLParam;
  language: LanguagesTitles;
}

/** @title Records Album Seo Loader */
export default async function loader(props: Props, _req: Request, ctx: FinalAppContext): Promise<SEOProps> {
  const { id, language } = props;
  const seo = ctx.seo ?? {};
  const column = getAlbumTitleColumn(language);

  const drizzle = await ctx.invoke.records.loaders.drizzle();

  const [album] = await drizzle
    .select({
      title: sql<string>`${column}`,
    })
    .from(albuns)
    .where(eq(albuns.id, id))
    .limit(1);

  if (!album) {
    console.error(`Album not found: ${id}`);
    return {};
  }

  const title = renderTemplateString(seo.titleTemplate ?? "", album.title);
  return {
    ...seo,
    title,
  };
}
