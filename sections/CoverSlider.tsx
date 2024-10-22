import type { CoverSliderProps } from "site/components/CoverSlider/index.tsx";
import CoverSlider from "site/components/CoverSlider/index.tsx";

/**
 * @title Cover Slider
 */
export default function Section(
  { covers, title }: CoverSliderProps = {
    title: "Ultimos Albuns",
    covers: [
      {
        cover: {
          source: "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/amazarashi/bcbf7865-b945-4632-a5e5-2a533fc88885/amazarashi_cover.jpg",
          alt: "Amazarashi cover of your last album: Eternal City",
        },
        title: "Eternal City",
        url: "/eternal-city",
      },
    ],
  }
) {
  return <CoverSlider covers={covers} title={title} />;
}
