import { ImageWidget, TextArea } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
export interface HeroProps {
  title: string;
  description: TextArea;
  backgroundImage: ImageWidget;
}

export default function Hero(
  { title, backgroundImage, description }: HeroProps,
) {
  return (
    <article className="relative h-full lg:pb-[10dvh] bottomAnimatedGradient z-10">
      <div className="relative z-10 flex flex-col-reverse items-center gap-8 lg:gap-10 lg:items-end p-6 lg:p-20 xl:p-36 lg:h-[90dvh] overflow-hidden lg:flex-row justify-center">
        <div className="bottomAnimationFadIn text-center lg:text-left">
          <h1 className="mb-3">{title}</h1>
          <p className="whitespace-break-spaces">{description}</p>
        </div>
      </div>
      <Image
        preload
        className="absolute w-full lg:h-[90dvh] object-cover top-0 left-0 z-0"
        width={1200}
        height={675}
        src={backgroundImage}
        alt={`Capa de Video do Youtube da Música ${title}`}
        fetchPriority="high"
      />
    </article>
  );
}
