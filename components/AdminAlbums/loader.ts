import { AppContext } from "site/apps/site.ts";

export default async function loader(_props: unknown, _req: Request, ctx: AppContext) {
  await ctx.invoke.site.loaders.AdminLogin.index();
}
