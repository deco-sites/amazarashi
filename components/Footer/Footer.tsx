import AmazarashiLogo from "site/components/Footer/AmazarashiLogo.tsx";
import ApologiesLogo from "site/components/Footer/Apologieslogo.tsx";
import Icon, { AvailableIcons } from "site/components/ui/Icon.tsx";

interface FooterProps {
  menuItens: {
    label: string;
    href: string;
  }[];
  socialNetworks: {
    label: string;
    href: string;
    icon: AvailableIcons;
  }[];
}

export default function Footer({ menuItens, socialNetworks }: FooterProps) {
  return (
    <footer class="bg-gray-700 py-8 border-t border-gray-800 text-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-start">
          {/* Logo and Menu Section */}
          <div class="mb-6 md:mb-0 w-full lg:w-fit">
            <a href="/" class="mb-4 mx-auto lg:mx-0 w-fit flex lg:block">
              <AmazarashiLogo />
            </a>
          </div>
          {/* Menu Section */}
          <div class="mb-6 md:mb-0">
            <nav>
              <span class="text-sm font-bold mb-2 block">Ir para:</span>
              <ul class="space-y-1">
                {menuItens.map((item) => (
                  <li>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* Social Media Section */}
          <div class="mb-6 md:mb-0">
            <div class="flex mb-2 flex-col gap-2">
              <span class="text-sm font-bold mb-2">Redes Sociais:</span>
              <div class="flex flex-row lg:flex-col flex-wrap gap-2">
                {socialNetworks.map((item) => (
                  <a href={item.href} class="flex items-center gap-2">
                    <Icon
                      size={24}
                      id={item.icon}
                      strokeWidth={item.icon === "Tiktok" ? 3 : 16}
                    />
                    <span class="hidden lg:block">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* FanClub Section */}
          <a href="https://apologies.jp/">
            <span class="text-sm font-bold mb-2">FanClub:</span>
            <ApologiesLogo />
          </a>
        </div>
      </div>
    </footer>
  );
}
