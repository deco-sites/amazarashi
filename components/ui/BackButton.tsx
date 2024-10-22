import { useScript } from "@deco/deco/hooks";
import { useId } from "site/sdk/useId.ts";

interface BackButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function BackButton({ children, className }: BackButtonProps) {
  const id = useId();
  const addGoBackClick = (componentId: string) => {
    const goBack = () => {
      history.back();
    };
    const component = document.getElementById(componentId);
    if (!component) return;
    component.addEventListener("click", goBack);
  };
  return (
    <>
      <a id={id} class={className}>
        {children}
      </a>
      <script type="module" dangerouslySetInnerHTML={{ __html: useScript(addGoBackClick, id) }} />
    </>
  );
}
