import { type AppContext as AC, type App } from "@deco/deco";
import website, { Props } from "apps/website/mod.ts";
import records from "site/apps/deco/records.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
type WebsiteApp = ReturnType<typeof website>;
type RecordsApp = ReturnType<typeof records>;
/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site(state: Props): App<Manifest, Props, [WebsiteApp]> {
  return {
    state,
    manifest,
    dependencies: [website(state)],
  };
}
export type SiteApp = ReturnType<typeof Site>;
export type AppContext = AC<App<Manifest, Props, [WebsiteApp, RecordsApp]>>;
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
