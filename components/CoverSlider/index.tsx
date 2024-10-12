import type { AlbumProps } from "./AlbumItem.tsx";
import AlbumItem from "./AlbumItem.tsx";

export interface Props {
  title?: string;
  albums: AlbumProps[];
}

const defaultAlbum = {
  cover: {
    source: "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/amazarashi/bcbf7865-b945-4632-a5e5-2a533fc88885/amazarashi_cover.jpg",
    alt: "Amazarashi cover of your last album: Eternal City",
  },
  title: "Eternal City",
  url: "/eternal-city",
};

const defaultProps = {
  title: "Ultimos Albuns",
  albums: [defaultAlbum, defaultAlbum, defaultAlbum, defaultAlbum, defaultAlbum],
};

export default function CoverSlider(props: Props = defaultProps) {
  const { title, albums } = props;
  return (
    <div>
      {title ? <h2 className="whitespace-break-spaces">{title}</h2> : null}
      <ul>
        {albums.map((album) => (
          <AlbumItem {...album} key={album.cover.source} />
        ))}
      </ul>
    </div>
  );
}
