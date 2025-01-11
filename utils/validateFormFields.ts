interface FormFieldValidation<T> {
  formFieldsMissing: string[];
  data: T;
}

export default function validateFormFields<T>(formFields: string[], data: Record<string, string>): FormFieldValidation<T> {
  const errors: string[] = [];
  for (const field of formFields) {
    if (!data[field]) {
      errors.push(field);
    }
  }
  return {
    formFieldsMissing: errors,
    data: data as T,
  };
}
