export default function transformFormDataToObject(formData: FormData): Record<string, string> {
  const object: Record<string, string> = {};
  formData.forEach((value, key) => {
    object[key] = value.toString();
  });
  return object;
}
