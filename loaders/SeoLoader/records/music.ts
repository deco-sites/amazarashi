import { renderTemplateString, Props as SEOProps } from "apps/website/components/Seo.tsx";
import { RequestURLParam } from "apps/website/functions/requestToParam.ts";
import { eq, sql } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { musics } from "site/db/schema.ts";
import { getAlbumTitleColumn, LanguagesTitles } from "site/utils/languagesTitles.ts";

interface Props {
  id: RequestURLParam;
  language: LanguagesTitles;
}

/** @title Records Music Seo Loader */
export default async function loader(props: Props, _req: Request, ctx: AppContext): Promise<SEOProps> {
  const { id, language } = props;
  const seo = ctx.seo ?? {};
  const column = getAlbumTitleColumn(language);

  const [music] = await ctx.drizzle
    .select({
      title: sql<string>`${column}`,
    })
    .from(musics)
    .where(eq(musics.id, id))
    .limit(1);

  if (!music) {
    console.error(`Album not found: ${id}`);
    return {};
  }

  const title = renderTemplateString(seo.titleTemplate ?? "", music.title);
  return {
    ...seo,
    title,
  };
}
