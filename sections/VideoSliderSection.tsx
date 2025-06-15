import VideoSlider, {
  VideoSliderProps,
} from "site/components/VideoSlider/index.tsx";

/**
 * @title Video Slider Section
 * @description A section that displays a YouTube video slider
 */

export default function VideoSliderSection(props: VideoSliderProps) {
  return (
    <section className="py-12 lg:py-16">
      <VideoSlider {...props} />
    </section>
  );
}
