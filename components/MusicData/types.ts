export interface MusicLyric {
  position: number;
  romanji: string;
  hiragana: string;
  english: string;
  start: number;
  end: number;
}

export interface MusicData {
  description: string | null;
  videoId: string | null;
}

export interface MusicDataProps {
  data: MusicData;
}
