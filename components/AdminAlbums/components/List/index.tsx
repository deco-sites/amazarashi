import Image from "apps/website/components/Image.tsx";
import { ComponentProps } from "site/components/AdminAlbums/components/List/types.ts";
import Icon from "site/components/ui/Icon.tsx";
export { default as action } from "site/components/AdminAlbums/components/List/action.ts";

export default function AdminAlbumsList(props: ComponentProps) {
    const {
        result,
    } = props;

    if (Array.isArray(result)) {
        return (
            <ul class="flex flex-col gap-1">
                {result.map((album) => (
                    <li class="flex items-center">
                        <Image
                            src={album.image}
                            alt={album.name}
                            width={30}
                            height={30}
                        />
                        <p class="flex-1 ml-1">{album.name}</p>
                        <div class="flex items-center justify-center gap-1">
                            <a
                                class="tooltip before:font-semibold"
                                data-tip="Editar Album"
                                href={`/admin/album/${album.id}/edit`}
                            >
                                <Icon id="pencil" size={24} />
                            </a>
                            <a
                                class="tooltip before:font-semibold"
                                data-tip="Ver Album"
                                href={`/album/${album.id}`}
                            >
                                <Icon id="view" size={24} />
                            </a>
                            <a
                                class="tooltip before:font-semibold"
                                data-tip="Deletar Album"
                                href={`/admin/album/${album.id}/delete`}
                            >
                                <Icon id="Trash" size={24} />
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        );
    } else if (result === "no results") {
        return <p>Nenhum album encontrado</p>;
    }
    return <p>Digite algo na busca.......</p>;
}
