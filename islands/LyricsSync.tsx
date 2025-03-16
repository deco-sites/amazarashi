import { useEffect, useState } from "preact/hooks";
import { MusicInfoData } from "site/components/MusicInfo/index.tsx";
import { LyricsLanguage } from "site/loaders/Lyrics/GetLanguages.ts";
import { Lyrics } from "site/loaders/Lyrics/GetLyrics.ts";

interface LyricsSyncProps {
  data: {
    musicInfo: MusicInfoData;
    lyrics: Lyrics[];
    languages: LyricsLanguage[];
  };
}

export default function LyricsSync({ data }: LyricsSyncProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // Initialize YouTube Player when API is ready
    globalThis.onYouTubeIframeAPIReady = () => {
      let currentLineInternal = 0;
      const newPlayer = new globalThis.YT.Player("player", {
        videoId: data.musicInfo.youtubeMusicId || "",
        events: {
          onReady: () => {
            setInterval(() => {
              const time = newPlayer.getCurrentTime();

              // Find current line based on time
              const currentLine = data.lyrics[0]?.lines.findIndex((line) => {
                const start = parseTimeToSeconds(line.start);
                const end = parseTimeToSeconds(line.end);
                return time >= start && time < end;
              });

              if (currentLineInternal !== currentLine) {
                if (currentLine !== -1) {
                  setCurrentLineIndex(currentLine);
                  currentLineInternal = currentLine;
                  // Scroll to current line
                  const currentLineElement = document.getElementById(
                    `line-${currentLine}`,
                  );
                  if (currentLineElement) {
                    const windowHeight = window.innerHeight;
                    const lineTop =
                      currentLineElement.getBoundingClientRect().top +
                      window.scrollY;
                    const lineHeight = currentLineElement.clientHeight;

                    // Scroll to position the current line in the middle of the window
                    window.scrollTo({
                      top: lineTop - (windowHeight / 2) + (lineHeight / 2),
                      behavior: "smooth",
                    });
                  }
                }
              }
            }, 100);
          },
        },
      });
    };
  }, []);

  const parseTimeToSeconds = (timeStr: string) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  return (
    <div class="min-h-screen p-4 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-center">
          {data.musicInfo.title}
        </h1>

        <div class="flex flex-col lg:flex-row gap-8">
          {/* Lyrics Section */}
          <div class="lg:w-1/2">
            <div class="space-y-6">
              {data.lyrics[0]?.lines.map((line, index) => {
                const isCurrentLine = index === currentLineIndex;
                const hiragana = line.texts.find((t) =>
                  t.languageId === "hiragana"
                );
                const romanji = line.texts.find((t) =>
                  t.languageId === "romanji"
                );
                const portuguese = line.texts.find((t) =>
                  t.languageId === "portuguese"
                );

                return (
                  <div
                    id={`line-${index}`}
                    key={index}
                    class={`transition-all duration-300 ${
                      isCurrentLine ? "scale-105 text-white " : "text-gray-400"
                    }`}
                  >
                    <p
                      class={`${
                        isCurrentLine ? "text-xl font-bold" : "text-base"
                      } mb-1`}
                    >
                      {hiragana?.text}
                    </p>
                    <p
                      class={`${
                        isCurrentLine ? "text-lg font-bold" : "text-sm"
                      } italic mb-1`}
                    >
                      {romanji?.text}
                    </p>
                    <p
                      class={`${
                        isCurrentLine ? "text-lg font-bold" : "text-sm"
                      }`}
                    >
                      {portuguese?.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video Section */}
          <div class="lg:w-1/2 lg:sticky lg:top-16 h-fit">
            <div class="aspect-video">
              <div id="player" class="w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
