import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import BackButton from "site/components/ui/BackButton.tsx";
import Icon from "site/components/ui/Icon.tsx";

export interface MusicInfoData {
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
    isSquare: boolean;
  };
  spotifyId: string | null;
  youtubeMusicId?: string | null;
}

export interface MusicInfoProps {
  data: MusicInfoData;
}

/** @title Music Info */
export default function MusicInfo(props: MusicInfoProps) {
  const {
    data: {
      title,
      romanji,
      hiragana,
      english,
      portuguese,
      releaseDate,
      cover,
    },
  } = props;

  const formattedReleaseDate = releaseDate.split("-").reverse().join("/");
  return (
    <div className="flex flex-col px-6 lg:px-20 xl:px-36 text-center lg:text-start">
      <BackButton className="animated !flex gap-2 w-fit cursor-pointer text-white my-5 py-1">
        <Icon id="ArrowBack" size={24} strokeWidth={2} />
        <span>Voltar</span>
      </BackButton>
      <div className="flex flex-col lg:flex-row-reverse bottomAnimationFadIn justify-between gap-4">
        <div class="w-full lg:w-2/4">
          <Image
            src={cover.url}
            alt={cover.alt}
            width={cover.isSquare ? 800 : 1280}
            preload
            fetchPriority="high"
            className="rounded-lg w-full"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1>{title}</h1>
          <p className="italic [&>strong]:not-italic">
            <strong>Nome em Romanji:</strong> {romanji}
            <br />
            <strong>Nome em Hiragana:</strong> {hiragana}
            <br />
            <strong>Nome em Inglês:</strong> {english}
            <br />
            <strong>Nome em Português:</strong> {portuguese}
            <br />
            <strong>Data de Lançamento:</strong> {formattedReleaseDate}
          </p>
        </div>
      </div>
    </div>
  );
}
