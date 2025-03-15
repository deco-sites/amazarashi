import { type AppContext as AC, type App } from "@deco/deco";
import { Secret } from "apps/website/loaders/secret.ts";
import website, { Props as WebsiteProps } from "apps/website/mod.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import manifest, { Manifest } from "../manifest.gen.ts";

type WebsiteApp = ReturnType<typeof website>;

export interface Props extends WebsiteProps {
  /**
   * @title GCP Service Account Key
   * @description The GCP service account key for the site.
   */
  gcpServiceAccountKey: Secret;
}

interface State extends WebsiteProps {
  drizzle: ReturnType<typeof drizzle>;
  gcpServiceAccountKey: unknown;
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
  const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;
  const pool = new pg.Pool({
    connectionString: connectionString,
  });
  const gcpServiceAccountKey = JSON.parse(state.gcpServiceAccountKey.get() ?? "{}");
  console.log(gcpServiceAccountKey);

  const db = drizzle({ client: pool });
  return {
    state: {
      ...state,
      drizzle: db,
      gcpServiceAccountKey,
    },
    manifest,
    dependencies: [website(state)],
  };
}

export type SiteApp = ReturnType<typeof Site>;
export type AppContext = AC<App<Manifest, State, [WebsiteApp]>>;
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
