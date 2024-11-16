import BackButton from "site/components/ui/BackButton.tsx";
import Icon from "site/components/ui/Icon.tsx";

export default function AdminMusics() {
    return (
        <div className="py-6 lg:py-6 xl:py-12 px-6 lg:px-20 xl:px-36 flex flex-col">
            <BackButton className="animated !flex gap-2 w-fit cursor-pointer text-white my-5 py-1">
                <Icon id="ArrowBack" size={24} strokeWidth={2} />
                <span>Voltar</span>
            </BackButton>
            <h1>Painel de Músicas</h1>
            <a class="btn btn-primary mt-5" href="/admin/music/new">
                Cadastrar Música
            </a>
            <div class="mt-5">
                <div class="label">
                    <label class="label-text" htmlFor="name">
                        Filtrar por:
                    </label>
                </div>
                <input
                    type="text"
                    id="name"
                    placeholder="Digite o nome de uma música para procurar..."
                    class="input input-bordered w-full"
                />
            </div>
        </div>
    );
}
