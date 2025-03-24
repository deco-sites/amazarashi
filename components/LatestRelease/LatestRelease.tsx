import { ImageWidget, TextArea } from "apps/admin/widgets.ts";

interface LatestReleaseProps {
  image: ImageWidget;
  title: string;
  description: TextArea;
  ctaLink: string;
}

export default function LatestRelease({
  image,
  title,
  description,
  ctaLink,
}: LatestReleaseProps) {
  return (
    <div className="px-6 lg:px-20 xl:px-36">
      <h2 className="mb-6">Ultimo Lançamento</h2>
      <div className="flex gap-6 flex-col lg:flex-row">
        <a className="w-full lg:max-w-[30%]" href={ctaLink}>
          <img className="w-full" src={image} alt={title} />
        </a>
        <div className="w-full lg:max-w-[70%] flex flex-col">
          <h3 className="mb-3">{title}</h3>
          <p className="mb-6">{description}</p>
          <a
            className="mt-6 animated cursor-pointer self-center lg:self-start"
            href={ctaLink}
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </div>
  );
}
