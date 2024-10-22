import Seo, { Props as SeoProps } from "apps/website/components/Seo.tsx";

interface Props {
  seoDataLoader: SeoProps;
}

export default function Section(props: Props) {
  return <Seo {...props.seoDataLoader} />;
}
