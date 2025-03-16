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

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-10 py-6 lg:py-6 xl:py-12 px-6 lg:px-20 xl:px-36 h-dvh">
        <div className="lg:w-1/2 text-center lg:text-left h-full">
          <ul className="flex justify-around mb-3" id={tabsIds}>
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
            <p>Letras</p>
          </div>
          <div id={moreInfoTabId} className="hidden">
            <h5 class="mb-2">Veja também no:</h5>
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
        <iframe
          className="lg:w-1/2 aspect-video"
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeVideoClipId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        >
        </iframe>
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
