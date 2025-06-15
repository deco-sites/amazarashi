import { VideoItemProps } from "site/components/VideoSlider/VideoItem.tsx";

/**
 * @title YouTube Video Records
 * @description Loader to provide video options for the VideoSlider component
 */
export default function videoRecords(): VideoItemProps[] {
  return [
    {
      videoId: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    },
    {
      videoId: "3JZ_D3ELwOQ",
      title: "Example Video 2",
    },
    {
      videoId: "kJQP7kiw5Fk",
      title: "Example Video 3",
    },
    // Add more videos as needed
  ];
}
