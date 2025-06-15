import { useScript } from "@deco/deco/hooks";
import VideoItem, {
  VideoItemProps,
} from "site/components/VideoSlider/VideoItem.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { useId } from "site/sdk/useId.ts";

/**
 * @title Custom Video Slider
 */
export interface VideoSliderProps {
  title?: string;
  /**
   * @title Videos
   * @format dynamic-options
   * @options site/loaders/VideoSlider/records.ts
   */
  videos: VideoItemProps[];
}

const loadVideoSliderButtons = (
  { nextButtonId, prevButtonId, carouselId }: {
    nextButtonId: string;
    prevButtonId: string;
    carouselId: string;
  },
) => {
  const nextButton = document.getElementById(nextButtonId);
  const prevButton = document.getElementById(prevButtonId);
  const carousel = document.getElementById(carouselId);

  if (!carousel || !nextButton || !prevButton) {
    return;
  }

  const next = () => {
    // Scroll by 80vw (width of each video) + gap
    carousel.scrollLeft += window.innerWidth * 0.82;
  };

  const prev = () => {
    // Scroll by 80vw (width of each video) + gap
    carousel.scrollLeft -= window.innerWidth * 0.82;
  };

  nextButton.addEventListener("click", next);
  prevButton.addEventListener("click", prev);
};

/**
 * @title Video Slider
 */
export default function VideoSlider(props: VideoSliderProps) {
  const { title, videos } = props;
  const nextButtonId = useId();
  const prevButtonId = useId();
  const carouselId = useId();

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="pl-6 lg:pl-20 xl:pl-36">
      <div className="flex justify-between items-center pr-6 lg:pr-20 xl:pr-36 mb-6">
        {title
          ? <h2 className="whitespace-break-spaces text-white">{title}</h2>
          : null}
        <div className="flex gap-3">
          <button
            data-slide="prev"
            aria-label="Previous video"
            className="btn btn-ghost btn-circle btn-info"
            id={prevButtonId}
          >
            <Icon id="ChevronLeft" height={24} width={24} strokeWidth={2} />
          </button>

          <button
            data-slide="next"
            aria-label="Next video"
            className="btn btn-ghost btn-circle btn-info"
            id={nextButtonId}
          >
            <Icon id="ChevronRight" height={24} width={24} strokeWidth={2} />
          </button>
        </div>
      </div>
      <ul
        className="carousel w-full gap-3 pr-6 lg:pr-20 xl:pr-36"
        id={carouselId}
      >
        {videos.map((video, index) => (
          <VideoItem {...video} key={`${video.videoId}${index}`} />
        ))}
      </ul>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(loadVideoSliderButtons, {
            nextButtonId,
            prevButtonId,
            carouselId,
          }),
        }}
      />
    </div>
  );
}
