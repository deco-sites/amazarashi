import { eq } from "drizzle-orm";
import { AppContext } from "site/apps/site.ts";
import { FormFields, Props } from "site/components/AdminAlbumNew/types.ts";
import { albuns } from "site/db/schema.ts";
import idGenerator from "site/utils/idGenerator.ts";
import transformFormDataToObject from "site/utils/transformFormDataToObject.ts";
import validateFormFields from "site/utils/validateFormFields.ts";

const formFields = ["nameRomanji", "nameHiragana", "nameEnglish", "releaseDate", "image"];

export default async function action(_props: unknown, req: Request, ctx: AppContext): Promise<Props> {
  await ctx.invoke.site.loaders.AdminLogin.index();

  const formData = transformFormDataToObject(await req.formData());
  const formFieldsValidation = validateFormFields<FormFields>(formFields, formData);

  if (formFieldsValidation.formFieldsMissing.length > 0) {
    return {
      resultType: "error",
      message: `Campos obrigatórios não preenchidos: ${formFieldsValidation.formFieldsMissing.join(", ")}`,
    };
  }
  const { data } = formFieldsValidation;
  const id = idGenerator(data.nameRomanji);

  const drizzle = await ctx.invoke.records.loaders.drizzle();
  const idExists = await drizzle.select({ id: albuns.id }).from(albuns).limit(1).where(eq(albuns.id, id));

  if (idExists.length > 0) {
    return {
      resultType: "error",
      message: "Já existe um album com esse nome.",
    };
  }

  await drizzle.insert(albuns).values({
    id,
    namePortuguese: data.nameRomanji,
    nameRomaji: data.nameRomanji,
    image: data.image,
    nameEnglish: data.nameEnglish,
    nameHiragana: data.nameHiragana,
    releaseDate: new Date(data.releaseDate),
  });

  return {
    resultType: "success",
    message: "Album criado com sucesso.",
  };
}
