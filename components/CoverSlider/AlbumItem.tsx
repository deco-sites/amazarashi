import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @title Album Item 2
 */
export interface AlbumProps {
  cover: {
    source: ImageWidget;
    alt: string;
  };
  title?: string;
  url?: string;
}

/**
 * @title Album Item
 */
export default function AlbumItem(props: AlbumProps) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!props.url) {
      return <>{children}</>;
    }
    return <a href={props.url}>{children}</a>;
  };
  const Content = () => (
    <>
      <div className="overflow-hidden">
        <Image src={props.cover.source} alt={props.cover.alt} width={600} height={600} className="group-hover:scale-110 transition-all" />
      </div>
      <h3 className="whitespace-break-spaces mt-5 lg:text-[26px]">{props.title}</h3>
    </>
  );

  return (
    <li className="carousel-item w-[calc(100vw_-_48px_-_24px)] md:w-[calc((100vw_-_48px_-_24px)/2)] lg:w-3/12 xl:w-2/12 group">
      <Wrapper>
        <Content />
      </Wrapper>
    </li>
  );
}
