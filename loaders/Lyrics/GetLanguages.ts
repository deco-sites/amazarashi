import { asc } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { languages } from "site/db/schema.ts";

export interface LyricsLanguage {
  id: string;
  name: string;
}

export default async function loader(_props: unknown, _req: Request, ctx: AppContext): Promise<LyricsLanguage[]> {
  const languagesReturned = await ctx.drizzle.select().from(languages).orderBy(asc(languages.name));
  return languagesReturned;
}
