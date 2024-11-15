import { ImageWidget } from "apps/admin/widgets.ts";

export interface AlbumInfoData {
  /** @default Test Album */
  title: string;
  romanji: string;
  hiragana: string;
  english: string;
  portuguese: string;
  /** @format date */
  releaseDate: string;
  cover: {
    url: ImageWidget;
    alt: string;
  };
}

export interface AlbumInfoProps {
  data: AlbumInfoData;
}
