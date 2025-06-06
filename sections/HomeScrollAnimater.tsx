import { useScriptAsDataURI } from "@deco/deco/hooks";

export default function HomeScrollAnimater() {
  const scrollAnimater = () => {
    window.addEventListener("load", () => {
      document.documentElement.style.scrollSnapType = "y mandatory";
      document.body.style.scrollBehavior = "smooth";
      const notAllowedSections = [
        "website/sections/Seo/SeoV2.tsx",
        "site/sections/Theme/Theme.tsx",
        "htmx/sections/htmx.tsx",
        "site/sections/Spacer.ts",
        "site/sections/Footer.tsx",
        "site/sections/HomeScrollAnimater.tsx",
      ];

      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        if (notAllowedSections.includes(section.dataset.manifestKey ?? "")) {
          return;
        }
        section.style.scrollSnapAlign = "center";
      });
    });
  };

  return <script src={useScriptAsDataURI(scrollAnimater)} />;
}
