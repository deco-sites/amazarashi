export interface MusicLyric {
  position: number;
  romanji: string;
  hiragana: string;
  english: string;
  start: number;
  end: number;
}

export interface MusicData {
  description: string;
  videoId: string;
  lyrics: MusicLyric[];
}

export interface MusicDataProps {
  data: MusicData;
}
