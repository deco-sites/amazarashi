import AdminAlbumsList from "site/components/AdminAlbums/components/List/index.tsx";
import BackButton from "site/components/ui/BackButton.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { useComponent } from "site/sections/Component.tsx";

export default function AdminAlbums() {
    return (
        <div
            className="py-6 lg:py-6 xl:py-12 px-6 lg:px-20 xl:px-36 flex flex-col"
            id="search-area"
        >
            <BackButton className="animated !flex gap-2 w-fit cursor-pointer text-white my-5 py-1">
                <Icon id="ArrowBack" size={24} strokeWidth={2} />
                <span>Voltar</span>
            </BackButton>
            <h1>Painel de Albums</h1>
            <form
                class="mt-5"
                hx-target="#result-area"
                hx-post={useComponent(
                    "/components/AdminAlbums/components/List/index.tsx",
                )}
                hx-indicator="#search-area"
            >
                <div class="flex gap-2 items-end">
                    <div class="w-full">
                        <div class="label">
                            <label class="label-text" htmlFor="name">
                                Filtrar por:
                            </label>
                        </div>
                        <input
                            name="query"
                            type="text"
                            id="name"
                            autoComplete="off"
                            hx-target="#result-area"
                            hx-post={useComponent(
                                "/components/AdminAlbums/components/List/index.tsx",
                            )}
                            hx-trigger="input change delay:500ms"
                            hx-indicator="#search-area"
                            placeholder="Digite o nome de um album para procurar..."
                            class="input input-bordered w-full"
                        />
                    </div>
                    <button class="btn btn-secondary">Pesquisar</button>
                </div>
            </form>
            <a class="btn btn-primary mt-5" href="/admin/album/new">
                Cadastrar Album
            </a>
            <p class="mt-5 text-sm font-semibold">Resultados:</p>
            <div id="result-area" class="mt-2 [.htmx-request_&]:hidden">
                <AdminAlbumsList result="wait for search" />
            </div>
            <span class="loading text-primary loading-spinner loading-xs hidden [.htmx-request_&]:inline mt-5" />
        </div>
    );
}
