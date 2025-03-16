import { Lyrics } from "site/loaders/Lyrics/GetLyrics.ts";

export interface MusicLyric {
  position: number;
  romanji: string;
  hiragana: string;
  english: string;
  start: number;
  end: number;
}

export interface MusicData {
  id: string;
  description: string | null;
  youtubeVideoClipId: string | null;
  spotifyId: string | null;
  youtubeMusicId: string | null;
}

export interface MusicDataProps {
  data: MusicData;
  lyrics: Lyrics[];
}
