export interface Props {
  /**@hide */
  resultType?: "success" | "error";
  /**@hide */
  message?: string;
}

export interface FormFields {
  nameRomanji: string;
  nameHiragana: string;
  nameEnglish: string;
  releaseDate: string;
  image: string;
}
