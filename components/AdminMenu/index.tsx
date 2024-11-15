import { AppContext } from "site/apps/site.ts";
import Icon from "site/components/ui/Icon.tsx";

export async function loader(_props: unknown, _req: Request, ctx: AppContext) {
    await ctx.invoke.site.loaders.AdminLogin.index();
}

/** @title Admin Menu */
export default function AdminMenu() {
    const liClasses =
        "w-fit flex items-center flex-col gap-2.5 hover:text-white hover:font-bold group cursor-pointer";
    const spanClasses =
        "flex flex-col items-center after:content-[''] after:relative after:block after:w-0 after:transition-[width] after:duration-[0.2s] after:h-0.5 after:bg-[white] after:mt-0.5 group-hover:after:w-full";

    return (
        <div className="py-6 lg:py-6 xl:py-12 px-6 lg:px-20 xl:px-36">
            <h1>Painel Adminstrativo</h1>
            <p className="mt-2">Selecione um opção abaixo:</p>
            <ul className="flex flex-wrap gap-5 mt-5">
                <li>
                    <a href="/admin/musics" className={liClasses}>
                        <Icon id="music_disc" size={50} />
                        <span className={spanClasses}>Músicas</span>
                    </a>
                </li>
                <li>
                    <a href="/admin/albums" className={liClasses}>
                        <Icon id="music_album" size={50} />
                        <span className={spanClasses}>Álbuns</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}
