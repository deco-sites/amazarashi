import { useScript } from "@deco/deco/hooks";
import { useId } from "site/sdk/useId.ts";

const goToNextSection = ({ nextButtonId, sectionUrl }: { nextButtonId: string; sectionUrl: string }) => {
  const nextButton = document.getElementById(nextButtonId);
  if (!nextButton) return;
  const currentSection = Array.from(document.getElementsByTagName("section")).find((section) => section.getAttribute("data-manifest-key") === sectionUrl);
  if (!currentSection) return;
  const next = () => {
    const nextSection = currentSection.nextElementSibling;
    if (!nextSection) return;
    nextSection.scrollIntoView({ behavior: "smooth" });
  };
  nextButton.addEventListener("click", next);
};

export const useScrollToNextSection = (sectionUrl: string) => {
  const nextButtonId = useId();

  const ScriptRender = () => (
    <script
      type="module"
      dangerouslySetInnerHTML={{
        __html: useScript(goToNextSection, { nextButtonId, sectionUrl }),
      }}
    />
  );

  return { nextButtonId, ScriptRender };
};
