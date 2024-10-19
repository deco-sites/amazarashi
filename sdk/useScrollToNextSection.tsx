import { useScript } from "@deco/deco/hooks";
import { useId } from "site/sdk/useId.ts";

const goToNextSection = ({ nextButtonId }: { nextButtonId: string }) => {
  const navigateParentToSectionElement = (element: HTMLElement) => {
    let elementFind = element;
    while (elementFind && elementFind.tagName.toUpperCase() !== "SECTION") {
      if (elementFind.parentElement === null) return;
      elementFind = elementFind.parentElement;
    }
    if (!elementFind) return;
    return elementFind;
  };
  const nextButton = document.getElementById(nextButtonId);
  if (!nextButton) return;
  const currentSection = navigateParentToSectionElement(nextButton);
  if (!currentSection) return;
  const next = () => {
    const nextSection = currentSection.nextElementSibling;
    if (!nextSection) return;
    nextSection.scrollIntoView({ behavior: "smooth" });
  };
  nextButton.addEventListener("click", next);
};

export const useScrollToNextSection = () => {
  const nextButtonId = useId();

  const ScriptRender = () => (
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html: useScript(goToNextSection, { nextButtonId }),
      }}
    />
  );

  return { nextButtonId, ScriptRender };
};
