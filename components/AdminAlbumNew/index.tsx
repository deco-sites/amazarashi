import { Props } from "site/components/AdminAlbumNew/types.ts";
import BackButton from "site/components/ui/BackButton.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { useComponent } from "site/sections/Component.tsx";

export default function AdminAlbums(props: Props) {
    return (
        <div
            className="py-6 lg:py-6 xl:py-12 px-6 lg:px-20 xl:px-36 flex flex-col"
            id="search-area"
        >
            <BackButton className="animated !flex gap-2 w-fit cursor-pointer text-white my-5 py-1">
                <Icon id="ArrowBack" size={24} strokeWidth={2} />
                <span>Voltar</span>
            </BackButton>
            <h1>Novo ALbum</h1>
            <form
                class="mt-5 flex flex-col gap-3"
                hx-post={useComponent(import.meta.url)}
            >
                <div class="w-full">
                    <div class="label">
                        <label class="label-text" htmlFor="nameRomanji">
                            Nome em Romanji:
                        </label>
                    </div>
                    <input
                        name="nameRomanji"
                        type="text"
                        id="nameRomanji"
                        autoComplete="off"
                        placeholder="Digite o nome do album em romanji."
                        class="input input-bordered w-full"
                    />
                </div>
                <div class="w-full">
                    <div class="label">
                        <label htmlFor="nameHiragana" class="label-text">
                            Nome em Hiragana
                        </label>
                    </div>
                    <input
                        type="text"
                        class="input input-bordered w-full"
                        name="nameHiragana"
                        id="nameHiragana"
                        autoComplete="off"
                        placeholder="Digite o nome do album em hiragana."
                    />
                </div>
                <div class="w-full">
                    <div class="label">
                        <label htmlFor="nameEnglish" class="label-text">
                            Nome em Inglês
                        </label>
                    </div>
                    <input
                        type="text"
                        class="input input-bordered w-full"
                        name="nameEnglish"
                        id="nameEnglish"
                        autoComplete="off"
                        placeholder="Digite o nome do album em inglês."
                    />
                </div>
                <div class="w-full">
                    <div class="label">
                        <label htmlFor="namePortuguese" class="label-text">
                            Nome em Português
                        </label>
                    </div>
                    <input
                        type="text"
                        class="input input-bordered w-full"
                        name="namePortuguese"
                        id="namePortuguese"
                        autoComplete="off"
                        placeholder="Digite o nome do album em português."
                    />
                </div>
                <div class="w-full">
                    <div class="label">
                        <label htmlFor="image" class="label-text">
                            Imagem
                        </label>
                    </div>
                    <input
                        type="text"
                        class="input input-bordered w-full"
                        name="image"
                        id="image"
                        autoComplete="off"
                        placeholder="Digite o link da imagem do album."
                    />
                </div>
                <div class="w-full">
                    <div class="label">
                        <label htmlFor="releaseDate" class="label-text">
                            Data de lançamento
                        </label>
                    </div>
                    <input
                        type="date"
                        class="input input-bordered w-full"
                        name="releaseDate"
                        id="releaseDate"
                        autoComplete="off"
                        placeholder="Digite a data de lançamento do album."
                    />
                </div>
                <button class="btn btn-primary w-full mt-6">Salvar</button>
            </form>
        </div>
    );
}
