import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import BackButton from "site/components/ui/BackButton.tsx";
import Icon from "site/components/ui/Icon.tsx";

export interface AlbumInfoData {
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

/** @title Album Info */
export default function AlbumInfo(props: AlbumInfoProps) {
  const {
    data: { title, romanji, hiragana, english, portuguese, releaseDate, cover },
  } = props;

  const formattedReleaseDate = releaseDate.split("-").reverse().join("/");
  return (
    <div className="flex flex-col px-6 lg:px-20 xl:px-36 text-center lg:text-start">
      <BackButton className="animated !flex gap-2 w-fit cursor-pointer text-white my-5 py-1">
        <Icon id="ArrowBack" size={24} strokeWidth={2} />
        <span>Voltar</span>
      </BackButton>
      <div className="flex justify-between items-center lg:items-end bottomAnimationFadIn flex-col-reverse lg:flex-row gap-3">
        <div>
          <h1>Informações do Album:</h1>
          <h2 className="mb-4">{title}</h2>
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
        <Image
          src={cover.url}
          alt={cover.alt}
          width={500}
          preload
          height={500}
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
