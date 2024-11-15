import { and, eq, gt } from "drizzle-orm";
import cookie from "npm:cookie";
import { AppContext } from "site/apps/site.ts";
import { sessions } from "site/db/schema.ts";

export default async function loader(_props: unknown, req: Request, ctx: AppContext) {
  const cookieHeader = req.headers.get("cookie");

  const drizzle = await ctx.invoke.records.loaders.drizzle();

  if (!cookieHeader) {
    ctx.response.headers.set("location", "/admin/login");
    ctx.response.headers.set("Set-Cookie", "session=; HttpOnly; Path=/; Max-Age=0");
    ctx.response.status = 302;
    return;
  }

  const parsedCookies = cookie.parse(cookieHeader);
  const session = parsedCookies.session;

  if (!session) {
    ctx.response.headers.set("location", "/admin/login");
    ctx.response.headers.set("Set-Cookie", "session=; HttpOnly; Path=/; Max-Age=0");
    ctx.response.status = 302;
    return;
  }
  console.log(session);
  const findedSession = await drizzle
    .select()
    .from(sessions)
    .where(and(eq(sessions.token, session), gt(sessions.expiration, Date.now())));
  console.log(findedSession);
  if (findedSession.length === 0) {
    ctx.response.headers.set("location", "/admin/login");
    ctx.response.headers.set("Set-Cookie", "session=; HttpOnly; Path=/; Max-Age=0");
    ctx.response.status = 302;
    return;
  }
}
