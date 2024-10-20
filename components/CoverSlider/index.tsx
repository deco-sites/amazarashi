import { useScript } from "@deco/deco/hooks";
import Icon from "site/components/ui/Icon.tsx";
import { useId } from "site/sdk/useId.ts";
import type { AlbumProps } from "./AlbumItem.tsx";
import AlbumItem from "./AlbumItem.tsx";

/**
 * @title Custom Cover Slider
 */
export interface CoverSliderProps {
  title?: string;
  /** @title Covers */
  albums: AlbumProps[];
}

function modulo(a: number) {
  if (a < 0) {
    return a * -1;
  }
  return a;
}

function percentage(originalValue: number, percentage: number) {
  return (originalValue * percentage) / 100;
}

const loadCarrousselButtons = ({ nextButtonId, prevButtonId, carruselId }: { nextButtonId: string; prevButtonId: string; carruselId: string }) => {
  const nextButton = document.getElementById(nextButtonId);
  const prevButton = document.getElementById(prevButtonId);
  const carrusel = document.getElementById(carruselId);

  if (!carrusel || !nextButton || !prevButton) {
    return;
  }

  const next = () => {
    carrusel.scrollLeft += carrusel.clientWidth;
  };

  const prev = () => {
    carrusel.scrollLeft -= carrusel.clientWidth;
  };

  const mobileHandleTouchEnd = (e: TouchEvent) => {
    const maxHeightAllowed = 100;
    const minWidthRequired = percentage(carrusel.clientWidth, 80);
    const startPointPos = e.changedTouches[0].clientX;
    const endPointPos = e.changedTouches[1].clientX;
    const touchHeight = modulo(e.changedTouches[0].clientY - e.changedTouches[1].clientY);
    const touchWidth = modulo(startPointPos - endPointPos);
    const direction = startPointPos > endPointPos ? "left" : "right";
    if (touchHeight > maxHeightAllowed) return;
    if (touchWidth < minWidthRequired) return;
    if (direction === "left") {
      next();
    } else {
      prev();
    }
  };

  nextButton.addEventListener("click", next);
  prevButton.addEventListener("click", prev);
  // carrusel.addEventListener("touchend", mobileHandleTouchEnd);
};

/**
 * @title Cover Slider
 */
export default function CoverSlider(props: CoverSliderProps) {
  const { title, albums } = props;
  const nextButtonId = useId();
  const prevButtonId = useId();
  const carruselId = useId();

  return (
    <div className="pl-6 lg:pl-20 xl:pl-36">
      <div className="flex justify-between items-center pr-6 lg:pr-20 xl:pr-36 mb-6">
        {title ? <h2 className="whitespace-break-spaces">{title}</h2> : null}
        <div className="flex gap-3">
          <button data-slide="prev" aria-label="Previous item" className="btn btn-ghost btn-circle btn-info" id={prevButtonId}>
            <Icon id="ChevronLeft" height={24} width={24} strokeWidth={2} />
          </button>

          <button data-slide="next" aria-label="Next item" className="btn btn-ghost btn-circle btn-info" id={nextButtonId}>
            <Icon id="ChevronRight" height={24} width={24} strokeWidth={2} />
          </button>
        </div>
      </div>
      <ul className="carousel w-full gap-3 pr-6 lg:pr-20 xl:pr-36" id={carruselId}>
        {albums.map((album, index) => (
          <AlbumItem {...album} key={`${album.cover.source}${index}`} />
        ))}
      </ul>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(loadCarrousselButtons, { nextButtonId, prevButtonId, carruselId }),
        }}
      />
    </div>
  );
}
