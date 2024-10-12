import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface AlbumProps {
  cover: {
    source: ImageWidget;
    alt: string;
  };
  title?: string;
  url?: string;
}

export default function AlbumItem(props: AlbumProps) {
  const Content = () => (
    <>
      <Image src={props.cover.source} alt={props.cover.alt} width={600} height={600} />
      <h3 className="whitespace-break-spaces">{props.title}</h3>
    </>
  );

  if (!props.url) {
    return (
      <li>
        <Content />
      </li>
    );
  }
  return (
    <li>
      <a href={props.url}>
        <Content />
      </a>
    </li>
  );
}
