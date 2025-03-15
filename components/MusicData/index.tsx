import { MusicDataProps } from "site/components/MusicData/types.ts";

/**@title Music Data */
function MusicData(props: MusicDataProps) {
  const { data: { description, videoId } } = props;
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-10 py-6 lg:py-6 xl:py-12 px-6 lg:px-20 xl:px-36 h-dvh">
      <div className="lg:w-1/2 text-center lg:text-left h-full">
        <ul className="flex justify-around mb-3">
          <li>
            <a className="animated cursor-pointer">Descrição</a>
          </li>
          <li>
            <a className="animated cursor-pointer">Letras</a>
          </li>
          <li>
            <a className="animated cursor-pointer">
              Mais Informações
            </a>
          </li>
        </ul>
        <p>{description}</p>
      </div>
      <iframe
        className="lg:w-1/2 h-full"
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
      </iframe>
    </div>
  );
}

export default MusicData;
