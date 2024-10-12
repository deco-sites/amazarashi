import { ImageWidget, TextArea } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  description: TextArea;
  backgroundImage: {
    source: ImageWidget;
    alt: string;
  };

  coverImage: {
    source: ImageWidget;
    alt: string;
  };
  cta: {
    label: string;
    link: string;
  };
}

export default function Hero(
  { title, cta, backgroundImage, coverImage, description }: Props = {
    title: "Amazarashi",
    description: 'Amazarashi é uma banda de rock japonesa da cidade de Aomori. Formada em 2007 pelos membros Hiromu Akita e Manami Toyokawa. Algumas músicas notáveis são "Sora ni Utaeba" 3ª Opening de My Hero Academia, "Speed to Masatsu" Opening de Rampo Kitan: Game of Laplace, a famosa "Kisetsu wa Tsugitsugi Shindeiku"(Estações morrem uma após a outra) que é tema de encerramento de Tokyo Ghoul e "Kyoukaisen"(Fronteira) Opening de 2ª Temporada de Eighty-Six.',
    backgroundImage: {
      source: "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/amazarashi/728ae9b6-e72d-4edd-a305-d2494feb4966/amazarashi_banner.jpeg",
      alt: "Crunchroll background artist cover",
    },
    coverImage: {
      source: "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/amazarashi/bcbf7865-b945-4632-a5e5-2a533fc88885/amazarashi_cover.jpg",
      alt: "Amazarashi cover of your last album: Eternal City",
    },
    cta: {
      label: "Saiba mais",
      link: "/about",
    },
  }
) {
  return (
    <article className="relative lg:h-[90dvh] bottomAnimatedGradient z-10">
      <div className="relative z-10 flex flex-col-reverse items-center gap-8 lg:gap-10 lg:items-end p-6 lg:p-36  h-full overflow-hidden lg:flex-row justify-center">
        <div className="bottomAnimationFadIn text-center lg:text-left">
          <h1 className="mb-3">{title}</h1>
          <p className="whitespace-break-spaces">{description}</p>
          <a href={cta.link} className="mt-6">
            {cta.label}
          </a>
        </div>
        <Image className="max-w-[40vw] lg:max-w-[25vw]" preload width={600} height={600} src={coverImage.source} alt={coverImage.alt} />
      </div>
      <Image preload className="absolute w-full h-full object-cover top-0 left-0 z-0" width={1200} height={675} src={backgroundImage.source} alt={backgroundImage.alt} />
    </article>
  );
}
