import Hero, { HeroProps } from "site/components/Hero/index.tsx";

/**
 * @title Hero
 */
export default function Section(
  { title, cta, backgroundImage, coverImage, description }: HeroProps = {
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
    },
  }
) {
  return <Hero title={title} cta={cta} backgroundImage={backgroundImage} coverImage={coverImage} description={description} />;
}
