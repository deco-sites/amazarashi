import { AppContext } from "site/apps/site.ts";
import { GoogleCloudTranslate } from "site/utils/googleCloudTranslate.ts";

interface Props {
  lyrics: string[];
}

interface ResultSuccess {
  lyrics: {
    original: string;
    romanized: string;
    translated: string;
  }[];
}

interface ResultError {
  error: string;
}

type Result = ResultSuccess | ResultError;

export default async function loader(props: Props, _req: Request, ctx: AppContext): Promise<Result> {
  if (!Deno.env.get("DATABASE_USER")) {
    ctx.response.status = 401;
    return {
      error: "Unauthorized",
    };
  }

  const translate = new GoogleCloudTranslate({
    projectId: "gui-dev-br",
    credentials: JSON.parse(ctx.gcpServiceAccountKey),
  });

  const response = await translate.translateText({
    sourceLanguageCode: "ja",
    targetLanguageCode: "pt",
    parent: translate.locationPath("gui-dev-br", "global"),
    contents: props.lyrics,
  });

  const romanized = await translate.romanizeText({
    sourceLanguageCode: "ja",
    parent: translate.locationPath("gui-dev-br", "global"),
    contents: props.lyrics,
  });

  return {
    lyrics: response.translations.map((translation, index) => ({
      original: props.lyrics[index],
      romanized: romanized.romanizations?.[index].romanizedText ?? "",
      translated: translation.translatedText ?? "",
    })),
  };
}
