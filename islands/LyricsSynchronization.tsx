import { useEffect } from "preact/hooks";
import { MusicInfoData } from "site/components/MusicInfo/index.tsx";
import { LyricsLanguage } from "site/loaders/Lyrics/GetLanguages.ts";
import { Lyrics } from "site/loaders/Lyrics/GetLyrics.ts";
import { invoke } from "site/runtime.ts";

interface YTPlayer {
  getCurrentTime: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  playVideo: () => void;
  pauseVideo: () => void;
}

// Declare YT types
declare global {
  var YT: {
    Player: new (
      elementId: string,
      config: {
        videoId: string;
        events?: {
          onReady?: (event: { target: unknown }) => void;
          onStateChange?: (event: { data: number }) => void;
        };
      },
    ) => YTPlayer;
  };
  var onYouTubeIframeAPIReady: () => void;
}

interface LyricsSynchronizationProps {
  lyrics: Lyrics[];
  languages: LyricsLanguage[];
  selectedLanguage: string;
  musicInfo: MusicInfoData;
}

export default function LyricsSynchronization(
  props: LyricsSynchronizationProps,
) {
  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    let currentLineIndex = 0;
    let currentLyrics = [...props.lyrics];
    let player: YTPlayer | null = null;
    let previewInterval: number | null = null;

    const formatTime = (seconds: number): string => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      const milliseconds = Math.floor((seconds % 1) * 100);

      return `${String(hours).padStart(2, "0")}:${
        String(minutes).padStart(2, "0")
      }:${String(remainingSeconds).padStart(2, "0")}.${
        String(milliseconds).padStart(2, "0")
      }`;
    };

    const formatTimeDisplay = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    const updateDisplay = () => {
      // Update current time display
      const timeDisplay = document.getElementById("current-time");
      if (timeDisplay && player) {
        timeDisplay.textContent = formatTimeDisplay(player.getCurrentTime());
      }

      // Update current and next lyrics display
      const currentLine = currentLyrics[0]?.lines[currentLineIndex];
      const nextLine = currentLyrics[0]?.lines[currentLineIndex + 1];

      const getCurrentText = (line: typeof currentLine) => {
        return line?.texts.find((t) => t.languageId === props.selectedLanguage)
          ?.text || "";
      };

      const currentLyricsDisplay = document.getElementById("current-lyrics");
      const nextLyricsDisplay = document.getElementById("next-lyrics");

      if (currentLyricsDisplay) {
        currentLyricsDisplay.textContent = getCurrentText(currentLine);
      }
      if (nextLyricsDisplay) {
        nextLyricsDisplay.textContent = getCurrentText(nextLine);
      }

      // Update timeline table
      const timelineBody = document.getElementById("timeline-body");
      if (timelineBody) {
        timelineBody.innerHTML = currentLyrics[0]?.lines.map((line) => `
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${line.start}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${line.end}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              ${getCurrentText(line)}
            </td>
          </tr>
        `).join("");
      }
    };

    const stopPreview = () => {
      if (previewInterval) {
        clearInterval(previewInterval);
        previewInterval = null;
      }
      if (player) {
        player.pauseVideo();
      }
      currentLineIndex = 0;
      updateDisplay();

      const previewButton = document.getElementById(
        "preview-button",
      ) as HTMLButtonElement;
      const stopButton = document.getElementById(
        "stop-button",
      ) as HTMLButtonElement;
      if (previewButton && stopButton) {
        previewButton.style.display = "block";
        stopButton.style.display = "none";
      }
    };

    // Initialize YouTube Player when API is ready
    globalThis.onYouTubeIframeAPIReady = () => {
      player = new globalThis.YT.Player("player", {
        videoId: props.musicInfo.youtubeMusicId || "",
        events: {
          onReady: () => {
            // Start updating display every second
            setInterval(updateDisplay, 1000);

            // Add event listeners to buttons
            const registerButton = document.getElementById(
              "register-button",
            ) as HTMLButtonElement;
            const previewButton = document.getElementById(
              "preview-button",
            ) as HTMLButtonElement;
            const stopButton = document.getElementById(
              "stop-button",
            ) as HTMLButtonElement;
            const saveButton = document.getElementById(
              "save-button",
            ) as HTMLButtonElement;

            registerButton?.addEventListener("click", () => {
              const time = player?.getCurrentTime() || 0;
              const formattedTime = formatTime(time);

              // Update current line end time and next line start time
              const newLyrics = structuredClone(currentLyrics);
              if (newLyrics[0]?.lines[currentLineIndex]) {
                newLyrics[0].lines[currentLineIndex].end = formattedTime;
              }
              if (newLyrics[0]?.lines[currentLineIndex + 1]) {
                newLyrics[0].lines[currentLineIndex + 1].start = formattedTime;
              }
              currentLyrics = newLyrics;
              currentLineIndex++;
              updateDisplay();
            });

            previewButton?.addEventListener("click", () => {
              // Reset to beginning
              currentLineIndex = 0;
              if (!player) return;
              player.seekTo(0, true);
              player.playVideo();
              updateDisplay();

              // Hide preview button, show stop button
              if (previewButton && stopButton) {
                previewButton.style.display = "none";
                stopButton.style.display = "block";
              }

              // Start checking for lyrics timing
              previewInterval = setInterval(() => {
                if (!player) return;
                const currentTime = player.getCurrentTime();
                const nextLine = currentLyrics[0]?.lines[currentLineIndex + 1];

                if (
                  nextLine &&
                  currentTime >=
                    parseFloat(
                      nextLine.start.split(":").reduce((acc, time) =>
                        (60 * parseFloat(acc) + parseFloat(time)).toString()
                      ),
                    )
                ) {
                  currentLineIndex++;
                  updateDisplay();
                }
              }, 100) as unknown as number;
            });

            stopButton?.addEventListener("click", stopPreview);

            saveButton?.addEventListener("click", async () => {
              try {
                saveButton.disabled = true;
                saveButton.textContent = "Saving...";
                await invoke.site.actions.Lyrics.save({
                  lyrics: currentLyrics,
                });
                saveButton.textContent = "Save";
              } catch (error) {
                console.error("Error saving lyrics:", error);
              } finally {
                saveButton.disabled = false;
              }
            });
          },
        },
      });
    };

    // Cleanup
    return () => {
      if (previewInterval) {
        clearInterval(previewInterval);
      }
    };
  }, [props.lyrics, props.selectedLanguage]);

  return (
    <div class="min-h-screen">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8">
          Lyrics Synchronization
        </h1>

        <div class="grid grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow-md p-4 flex justify-center align-center">
            <div id="player" class="block aspect-[1/1]"></div>
          </div>

          <div class="bg-white rounded-lg shadow-md p-4">
            <h2 class="text-xl font-semibold mb-4 text-black">Instructions</h2>
            <p class="mb-4 text-black">
              Click the Register button to mark the end time of the current
              lyrics and start time for the next lyrics
            </p>

            <div class="mb-6">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Current Lyrics:
                </label>
                <div
                  id="current-lyrics"
                  class="p-3 bg-yellow-100 rounded-md min-h-[50px] border border-yellow-300 text-black"
                >
                </div>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                  Next Lyrics:
                </label>
                <div
                  id="next-lyrics"
                  class="p-3 bg-gray-100 rounded-md min-h-[50px] border border-gray-300 text-black"
                >
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center mt-8">
              <div class="text-sm text-gray-600">
                <span class="font-semibold">Current Time:</span>
                <span id="current-time">0:00</span>
              </div>
              <div class="flex space-x-4">
                <button
                  id="register-button"
                  type="button"
                  class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Register
                </button>
                <button
                  id="preview-button"
                  type="button"
                  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Preview
                </button>
                <button
                  id="stop-button"
                  type="button"
                  style="display: none"
                  class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Stop
                </button>
                <button
                  id="save-button"
                  type="button"
                  class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 bg-white rounded-lg shadow-md p-4">
          <h2 class="text-xl font-semibold mb-4 text-black">Lyrics Timeline</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Start Time
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    End Time
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Lyrics
                  </th>
                </tr>
              </thead>
              <tbody
                id="timeline-body"
                class="bg-white divide-y divide-gray-200"
              >
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
