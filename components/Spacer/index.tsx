interface Props {
  desktop: number;
  mobile: number;
}

/**
 * @title Spacer
 */
export default function Spacer(props: Props) {
  const cssVars = {
    "--spacer-desktop": `${props.desktop}px`,
    "--spacer-mobile": `${props.mobile}px`,
  } as React.CSSProperties;

  return <div className="h-[var(--spacer-mobile)] lg:h-[var(--spacer-desktop)]" style={cssVars} />;
}
