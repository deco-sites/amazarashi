import { SQLiteColumn } from "drizzle-orm/sqlite-core";
import { albuns } from "site/db/schema.ts";

export type LanguagesTitles = "hiragana" | "romanji" | "english" | "portuguese";
export type LanguagesTitlesRecord = Record<LanguagesTitles, string>;
export const altCoverLang: LanguagesTitlesRecord = {
  hiragana: "Capa de ",
  romanji: "Cover of ",
  english: "Cover of ",
  portuguese: "Capa de ",
};
export type LanguagesTitleSqlAlbumTitle = Record<LanguagesTitles, SQLiteColumn>;
export const albumTitleColumn: LanguagesTitleSqlAlbumTitle = {
  english: albuns.nameEnglish,
  hiragana: albuns.nameHiragana,
  romanji: albuns.nameRomaji,
  portuguese: albuns.namePortuguese,
};
export const getAlbumCoverAlt = (language: LanguagesTitles) => altCoverLang[language];
export const getAlbumTitleColumn = (language: LanguagesTitles) => albumTitleColumn[language];
