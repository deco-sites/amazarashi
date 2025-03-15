import { type AppContext as AC, type App } from "@deco/deco";
import type { Manifest as ManifestRecords } from "apps/records/manifest.gen.ts";
import website, { Props } from "apps/website/mod.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import manifest, { Manifest } from "../manifest.gen.ts";

type WebsiteApp = ReturnType<typeof website>;

interface State extends Props {
  drizzle: ReturnType<typeof drizzle>;
}

/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site(state: Props): App<Manifest, State, [WebsiteApp]> {
  const user = Deno.env.get("DATABASE_USER") ?? "amazarashi";
  const password = Deno.env.get("DATABASE_PASSWORD") ?? "amazarashi";
  const host = "selfhost.gui.dev.br";
  const port = 5432;
  const database = "amazarashi";

  const pool = new pg.Pool({
    connectionString: `postgresql://${user}:${password}@${host}:${port}/${database}`,
  });

  const db = drizzle({ client: pool });
  return {
    state: {
      ...state,
      drizzle: db,
    },
    manifest,
    dependencies: [website(state)],
  };
}

export type SiteApp = ReturnType<typeof Site>;
export type UniqueManifest = Manifest & ManifestRecords;
export type AppContext = AC<App<UniqueManifest, State, [WebsiteApp]>>;
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
