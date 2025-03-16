import { useScriptAsDataURI } from "deco/hooks/useScript.ts";
import { MusicDataProps } from "site/components/MusicData/types.ts";
import Icon from "site/components/ui/Icon.tsx";
import { useId } from "site/sdk/useId.ts";

function tabManager(
  tabsIds: string,
  descriptionTabId: string,
  lyricsTabId: string,
  moreInfoTabId: string,
) {
  const tabsContainer = document.getElementById(tabsIds);
  if (!tabsContainer) return;

  const tabs = tabsContainer.getElementsByTagName("a");
  const tabContents = [
    document.getElementById(descriptionTabId),
    document.getElementById(lyricsTabId),
    document.getElementById(moreInfoTabId),
  ];

  // Adiciona o evento de clique em cada aba
  Array.from(tabs).forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // Remove a classe active de todas as abas
      Array.from(tabs).forEach((t) => {
        t.classList.remove("before:!w-full");
      });

      // Adiciona a classe active na aba clicada
      tab.classList.add("before:!w-full");

      // Esconde todos os conteúdos
      tabContents.forEach((content) => {
        if (content) content.classList.add("hidden");
      });

      // Mostra o conteúdo da aba selecionada
      const selectedContent = tabContents[index];
      if (selectedContent) selectedContent.classList.remove("hidden");
    });
  });

  // Ativa a primeira aba por padrão
  if (tabs[0]) {
    tabs[0].classList.add("active");
    if (tabContents[0]) tabContents[0].classList.remove("hidden");
  }
}

/**@title Music Data */
function MusicData(props: MusicDataProps) {
  const {
    data: { description, youtubeVideoClipId, spotifyId, youtubeMusicId },
  } = props;
  const tabsIds = useId();
  const descriptionTabId = useId();
  const lyricsTabId = useId();
  const moreInfoTabId = useId();

  const lyricsLines = props.lyrics[0].lines ?? [];
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-10 py-6 lg:py-6 xl:py-12 px-6 lg:px-20 xl:px-36">
        <div className="lg:w-1/2 text-center lg:text-left h-full">
          <ul className="flex justify-around mb-6" id={tabsIds}>
            <li>
              <a className="animated cursor-pointer before:!w-full">
                Descrição
              </a>
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
          <div id={descriptionTabId}>
            <p class="text-justify">{description}</p>
          </div>
          <div id={lyricsTabId} className="hidden">
            <div class="flex justify-end mb-4">
              <a
                href={`/lyrics-sync/${props.data.id}`}
                class="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <Icon id="view" size={20} strokeWidth={2} />
                Ver sincronizado
              </a>
            </div>
            <p class="">
              {lyricsLines.map((line) => {
                const hiragana = line.texts.find((text) =>
                  text.languageId === "hiragana"
                );
                const romanji = line.texts.find((text) =>
                  text.languageId === "romanji"
                );
                const portuguese = line.texts.find((text) =>
                  text.languageId === "portuguese"
                );
                return (
                  <p className="mb-6">
                    <span className="block text-lg font-medium text-gray-200">
                      {hiragana?.text}
                    </span>
                    <span className="block text-sm text-gray-400 italic">
                      {romanji?.text}
                    </span>
                    <span className="block text-base text-gray-300">
                      {portuguese?.text}
                    </span>
                  </p>
                );
              })}
            </p>
          </div>
          <div id={moreInfoTabId} className="hidden">
            <h5 class="mb-5">Veja também no:</h5>
            <div class="flex flex-col gap-2">
              {spotifyId
                ? (
                  <a
                    target="_blank"
                    href={`https://open.spotify.com/tracklea/${spotifyId}`}
                    class="flex gap-2 items-center justify-center w-fit hover:font-semibold hover:text-white cursor-pointer"
                  >
                    <Icon id="Spotify" size={24} strokeWidth={2} />
                    <span>Ouvir no Spotify</span>
                  </a>
                )
                : null}
              {youtubeMusicId
                ? (
                  <a
                    target="_blank"
                    href={`https://music.youtube.com/watch?v=${youtubeMusicId}`}
                    class="flex gap-2 items-center justify-center w-fit hover:font-semibold hover:text-white cursor-pointer"
                  >
                    <Icon id="YoutubeMusic" size={24} strokeWidth={2} />
                    <span>Ouvir no Youtube Music</span>
                  </a>
                )
                : null}
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 lg:sticky lg:top-16 min-h-[500px] h-full max-h-[500px]">
          <iframe
            className="aspect-video"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeVideoClipId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          >
          </iframe>
        </div>
      </div>
      <script
        src={useScriptAsDataURI(
          tabManager,
          tabsIds,
          descriptionTabId,
          lyricsTabId,
          moreInfoTabId,
        )}
      />
    </>
  );
}

export default MusicData;
