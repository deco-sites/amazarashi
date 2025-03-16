import { type App as A, type AppContext as AC } from "@deco/deco";
import { Secret } from "apps/website/loaders/secret.ts";
import website, { Props as WebsiteProps } from "apps/website/mod.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import manifest, { Manifest } from "site/manifest.gen.ts";

export interface Props extends WebsiteProps {
  gcpServiceAccountKey?: Secret;
}
export type App = ReturnType<typeof Site>;
export type AppContext = AC<App>;
interface State extends WebsiteProps {
  gcpServiceAccountKey: string;
  drizzle: ReturnType<typeof drizzle>;
}

/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site(state: Props): A<Manifest, State, [ReturnType<typeof website>]> {
  const user = Deno.env.get("DATABASE_USER") ?? "amazarashi";
  const password = Deno.env.get("DATABASE_PASSWORD") ?? "amazarashi";
  const host = "selfhost.gui.dev.br";
  const port = 5432;
  const database = "amazarashi";
  const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;
  const pool = new pg.Pool({
    connectionString: connectionString,
  });
  let gcpServiceAccountKey = "";
  if (state.gcpServiceAccountKey) {
    gcpServiceAccountKey = state.gcpServiceAccountKey.get() ?? "";
  }

  const db = drizzle({ client: pool });
  return {
    state: {
      ...state,

      drizzle: db,
      gcpServiceAccountKey: gcpServiceAccountKey,
    },
    manifest,
    dependencies: [website(state)],
  };
}

export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
