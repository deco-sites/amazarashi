import { useScript } from "@deco/deco/hooks";
import { useId } from "site/sdk/useId.ts";

/** @title {{title}} */
export interface VideoItemProps {
  /**
   * @title YouTube Video ID
   * @description The ID from YouTube URL (e.g., from https://youtube.com/watch?v=VIDEO_ID)
   */
  videoId: string;
  title?: string;
}

const setupVideoClickHandler = (
  { videoContainerId, titleOverlayId }: {
    videoContainerId: string;
    titleOverlayId: string;
  },
) => {
  const videoContainer = document.getElementById(videoContainerId);
  const titleOverlay = document.getElementById(titleOverlayId);

  if (!videoContainer || !titleOverlay) {
    return;
  }

  const hideTitle = () => {
    titleOverlay.style.display = "none";
  };

  // Hide title when video container is clicked (indicating play)
  videoContainer.addEventListener("click", hideTitle);
};

/** @title Video Item */
export default function VideoItem(props: VideoItemProps) {
  const videoContainerId = useId();
  const titleOverlayId = useId();
  const Content = () => (
    <>
      <div className="overflow-hidden relative w-full" id={videoContainerId}>
        <iframe
          src={`https://www.youtube.com/embed/${props.videoId}?rel=0&modestbranding=1&showinfo=0`}
          title={props.title || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video border-0 rounded-lg"
          loading="lazy"
        />

        {/* Title overlay - appears on hover */}
        {props.title && (
          <div
            id={titleOverlayId}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <h3 className="text-white text-sm lg:text-base font-semibold line-clamp-2">
              {props.title}
            </h3>
          </div>
        )}
      </div>
    </>
  );

  return (
    <li className="carousel-item w-[80vw] max-h-[80vh] group">
      <Content />
      {props.title && (
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(setupVideoClickHandler, {
              videoContainerId,
              titleOverlayId,
            }),
          }}
        />
      )}
    </li>
  );
}
