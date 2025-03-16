import { useState } from "preact/hooks";
import { invoke } from "site/runtime.ts";
import { clx } from "site/sdk/clx.ts";
import { LyricsLanguage } from "../loaders/Lyrics/GetLanguages.ts";
import { Line, Lyrics } from "../loaders/Lyrics/GetLyrics.ts";
interface LyricsEditorProps {
  lyrics: Lyrics[];
  languages: LyricsLanguage[];
}

export default function LyricsEditor(props: LyricsEditorProps) {
  const [lyricsArray, setLyricsArray] = useState<Lyrics[]>(props.lyrics);
  const [selectedLyricsIndex, setSelectedLyricsIndex] = useState<number>(0);
  const [loadingTranslateAndRomanize, setLoadingTranslateAndRomanize] =
    useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    props.languages[0]?.id || "",
  );
  const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(
    null,
  );
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const currentLyrics = lyricsArray[selectedLyricsIndex];

  const handleLineChange = (field: keyof Line, value: string | number) => {
    if (selectedLineIndex === null) return;

    const newLyricsArray = [...lyricsArray];
    const newLines = [...newLyricsArray[selectedLyricsIndex].lines];
    newLines[selectedLineIndex] = {
      ...newLines[selectedLineIndex],
      [field]: value,
    };
    newLyricsArray[selectedLyricsIndex] = {
      ...newLyricsArray[selectedLyricsIndex],
      lines: newLines,
    };
    setLyricsArray(newLyricsArray);
  };

  const handleLineTextChange = (value: string) => {
    if (selectedLineIndex === null) return;

    const newLyricsArray = [...lyricsArray];
    const newLines = [...newLyricsArray[selectedLyricsIndex].lines];
    const line = newLines[selectedLineIndex];
    const textIndex = line.texts.findIndex((t) =>
      t.languageId === selectedLanguage
    );

    if (textIndex === -1) return;

    const newTexts = [...line.texts];
    newTexts[textIndex] = { ...newTexts[textIndex], text: value };
    newLines[selectedLineIndex] = { ...line, texts: newTexts };
    newLyricsArray[selectedLyricsIndex] = {
      ...newLyricsArray[selectedLyricsIndex],
      lines: newLines,
    };
    setLyricsArray(newLyricsArray);
  };

  const addNewLine = () => {
    const newLyricsArray = [...lyricsArray];
    const newLine: Line = {
      id: crypto.randomUUID(),
      position: currentLyrics.lines.length,
      start: "00:00:00.00",
      end: "00:00:05.00",
      texts: props.languages.map((lang) => ({
        id: crypto.randomUUID(),
        languageId: lang.id,
        text: "",
      })),
    };
    newLyricsArray[selectedLyricsIndex].lines.push(newLine);
    setLyricsArray(newLyricsArray);
    setSelectedLineIndex(currentLyrics.lines.length);
  };

  const removeLine = () => {
    if (selectedLineIndex === null) return;

    const newLyricsArray = [...lyricsArray];
    newLyricsArray[selectedLyricsIndex].lines.splice(selectedLineIndex, 1);
    setLyricsArray(newLyricsArray);
    setSelectedLineIndex(null);
  };

  const autoRomanizeAndTranslate = async () => {
    if (loadingTranslateAndRomanize) return;
    setLoadingTranslateAndRomanize(true);
    try {
      const hiraganaLyrics = lyricsArray[selectedLyricsIndex].lines.flatMap(
        (line) => {
          return line.texts.filter((text) => text.languageId === "hiragana")
            .map((
              text,
            ) => text.text);
        },
      ).filter((lyric) => lyric.length > 0);
      const tranlatedAndRomanized = await invoke.site.loaders.Translation
        .Translator({
          lyrics: hiraganaLyrics,
        });
      if ("error" in tranlatedAndRomanized) {
        console.error(tranlatedAndRomanized.error);
        setLoadingTranslateAndRomanize(false);
        return;
      }
      const newLyricsArray = [...lyricsArray];
      newLyricsArray[selectedLyricsIndex].lines =
        newLyricsArray[selectedLyricsIndex].lines.map((line) => {
          const hiraganaLyric = line.texts.filter((text) =>
            text.languageId === "hiragana"
          )[0].text;
          const tranlationAndRomanization = hiraganaLyric === ""
            ? {
              translated: "",
              romanized: "",
              original: "",
            }
            : tranlatedAndRomanized.lyrics.find(
              (translatedAndRomanizedLyric) => {
                return translatedAndRomanizedLyric.original === hiraganaLyric;
              },
            );

          if (!tranlationAndRomanization) {
            console.error(
              "No tranlation and romanization found for hiragana lyric",
              hiraganaLyric,
            );
            return line;
          }

          const hasRomanji = line.texts.findIndex((text) =>
            text.languageId === "romanji"
          );
          if (hasRomanji === -1) {
            line.texts.push({
              id: crypto.randomUUID(),
              languageId: "romanji",
              text: tranlationAndRomanization.romanized,
            });
          } else {
            line.texts[hasRomanji] = {
              ...line.texts[hasRomanji],
              text: tranlationAndRomanization.romanized,
            };
          }

          const hasPortuguese = line.texts.findIndex((text) =>
            text.languageId === "portuguese"
          );
          if (hasPortuguese === -1) {
            line.texts.push({
              id: crypto.randomUUID(),
              languageId: "portuguese",
              text: tranlationAndRomanization.translated,
            });
          } else {
            line.texts[hasPortuguese] = {
              ...line.texts[hasPortuguese],
              text: tranlationAndRomanization.translated,
            };
          }
          return line;
        });
      setLyricsArray(newLyricsArray);
      setLoadingTranslateAndRomanize(false);
    } catch (error) {
      console.error(error);
      setLoadingTranslateAndRomanize(false);
    }
  };

  const saveLyrics = async () => {
    if (loadingSave) return;
    setLoadingSave(true);
    try {
      await invoke.site.actions.Lyrics.save({
        lyrics: lyricsArray,
      });
      setLoadingSave(false);
    } catch (error) {
      console.error(error);
      setLoadingSave(false);
    }
  };

  if (lyricsArray.length === 0) {
    return (
      <div class="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>No lyrics available to edit.</span>
      </div>
    );
  }

  const selectedLine = selectedLineIndex !== null
    ? currentLyrics.lines[selectedLineIndex]
    : null;
  const selectedText = selectedLine?.texts.find((t) =>
    t.languageId === selectedLanguage
  );

  return (
    <div class="container mx-auto p-4 max-w-4xl">
      <h1 class="text-3xl font-bold text-center my-4">Lyrics Editor</h1>

      <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
        {lyricsArray.length > 1 && (
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Version
            </label>
            <select
              class="select select-bordered w-full"
              value={selectedLyricsIndex}
              onChange={(e) => {
                setSelectedLyricsIndex(parseInt(e.currentTarget.value));
                setSelectedLineIndex(null);
              }}
            >
              {lyricsArray.map((lyrics, index) => (
                <option key={lyrics.id} value={index}>
                  Version {index + 1} - Music ID: {lyrics.musicId}
                </option>
              ))}
            </select>
          </div>
        )}

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <div class="border border-gray-300 rounded-md p-2">
            <div class="flex items-center space-x-2">
              {props.languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  type="button"
                  class={clx(
                    "px-3 py-1 rounded-md text-sm font-medium",
                    selectedLanguage === lang.id
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div class="mb-4">
          <button
            onClick={autoRomanizeAndTranslate}
            class="btn btn-outline text-gray-800 mr-auto block w-full"
          >
            {loadingTranslateAndRomanize
              ? <span class="loading loading-spinner loading-sm"></span>
              : (
                "Auto Romanize and Translate"
              )}
          </button>
        </div>

        <div class="mb-4">
          <div class="flex justify-between items-center mb-1">
            <label class="block text-sm font-medium text-gray-700">Text</label>
            <span class="text-sm text-gray-500">
              {currentLyrics.lines.length} texts
            </span>
          </div>

          <div class="border border-gray-300 rounded-md mb-4 max-h-64 overflow-y-auto">
            {currentLyrics.lines.map((line, index) => {
              const text = line.texts.find((t) =>
                t.languageId === selectedLanguage
              );
              return (
                <div
                  key={line.id}
                  onClick={() => setSelectedLineIndex(index)}
                  class={clx(
                    "p-2 border-b border-gray-200 cursor-pointer",
                    selectedLineIndex === index ? "bg-gray-100" : "",
                  )}
                >
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">#{index}</span>
                    <span class="text-xs text-gray-500">
                      {line.start} - {line.end}
                    </span>
                  </div>
                  <p class="text-black">{text?.text || ""}</p>
                </div>
              );
            })}
          </div>
        </div>

        {selectedLine && (
          <>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Edit Text
              </label>
              <textarea
                value={selectedText?.text || ""}
                onChange={(e) => handleLineTextChange(e.currentTarget.value)}
                class="textarea textarea-bordered w-full bg-gray-50 text-gray-900"
                rows={3}
                placeholder="Enter lyrics text"
              />
            </div>

            <div class="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <div class="border h-12 border-gray-300 rounded-md p-2 text-center bg-gray-50 text-gray-900 flex items-center justify-center">
                  {selectedLineIndex}
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Start
                </label>
                <input
                  type="text"
                  value={selectedLine.start}
                  onChange={(e) =>
                    handleLineChange("start", e.currentTarget.value)}
                  class="input input-bordered w-full bg-gray-50 text-gray-900"
                  placeholder="00:00:00.00"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  End
                </label>
                <input
                  type="text"
                  value={selectedLine.end}
                  onChange={(e) =>
                    handleLineChange("end", e.currentTarget.value)}
                  class="input input-bordered w-full bg-gray-50 text-gray-900"
                  placeholder="00:00:00.00"
                />
              </div>
            </div>
          </>
        )}

        <div class="grid grid-cols-2 justify-between">
          <button
            onClick={removeLine}
            type="button"
            class={clx(
              "btn btn-outline text-gray-800 mr-auto block",
              !selectedLine ? "opacity-0 pointer-events-auto" : "",
            )}
          >
            Remove
          </button>

          <button
            onClick={addNewLine}
            type="button"
            class="btn  text-white hover:text-black hover:bg-white hover:border-black block ml-auto"
          >
            Add Text
          </button>
        </div>

        <button
          onClick={saveLyrics}
          type="button"
          class="btn  text-white hover:text-black hover:bg-white hover:border-black block ml-auto w-full mt-4"
        >
          {loadingSave
            ? <span class="loading loading-spinner loading-sm"></span>
            : (
              "Save"
            )}
        </button>
      </div>
    </div>
  );
}
