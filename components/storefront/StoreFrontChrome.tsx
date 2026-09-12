import Link from "next/link";
import {Icon} from "@/components/dashboard/Icon";

const categories = [
    "Laços",
    "Tiaras",
    "Viseiras",
    "Faixas"
]

export function StoreHeader(
    {
        name
    }: {
        name: string;
    }
) {
    const firstName = name.split(" ")[0] || "Tem"

    return (
        <>
            <div className="bg-ink text-[#C9C7D1]">
                <div className="mx-auto flex h-10 max-w-[1600px] items-center justify-between px-6 font-sans
                                 text-[12.5px] lg:px-10">
                    <div className="flex items-center gap-2">
                        <Icon name="truck" size={14} strokeWidth={2} className="text-pink-400" />
                        <span>
                            Entrega grátis nas ordens acima <span className="font-semibold text-white">R$ 50,00</span>
                        </span>
                    </div>
                    <div className="hidden items-center gap-6 sm:flex">
                        {["Home", "Todos Os Vendedores", "Vendedores da Cris Laços", "Ajuda"].map((l) => (
                            <Link href="/" key={l} className="text-[#C9C7D1] hover:text-white">
                                {l}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-40 border-b border-line-soft bg-surface">
                <div className="mx-auto flex h-20 max-w-[1600px] items-center gap-7 px-6 lg:px-10">
                    <Link href="/" className="flex-none font-display text-[27px] font-extrabold tracking-[-0.02em] text-ink">
                        Cris <span className="text-pink-500">Laços</span>
                    </Link>
                    <div className="hidden h-12 flex-1 items-center rounded-lg border border-line bg-field md:flex">
                        <div className="flex h-full items-center gap-1.5 border-r border-[#E6E4EC] px-4 font-sans
                                      text-[13px] font-medium text-ink-soft">
                            Todas as Categorias
                            <Icon name="chevronDown" size={15} strokeWidth={2} className="text-muted" />
                        </div>
                        <input
                            placeholder="Pesquisar itens"
                            className="min-w-0 flex-1 border-none bg-transparent px-4 text-[14px] text-ink outline-none"
                        />
                        <button
                            aria-label="Pesquisar"
                            className="flex h-full items-center justify-center rounded-r-lg bg-pink-500 px-5
                                        text-white transition-colors hover:bg-pink-600"
                        >
                            <Icon name="search" size={19} strokeWidth={2}  />
                        </button>
                    </div>
                    <div className="flex flex-none items-center gap-2">
                        <button className="flex flex-col items-center gap-0.5 rounded-md px-2.5 py-1.5 text-ink-soft
                                    transition-colors hover:bg-field">
                            <Icon name="heartline" size={21} strokeWidth={2}  />
                            <span className="font-sans text-[11px] font-medium text-muted">Lista de Desejos</span>
                        </button>
                        <Link className="flex items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-field"
                               href="/dashboard">
                            <span className="flex h-9.5 w-9.5 items-center justify-center rounded-full
                                bg-[linear-gradient(135deg,var(--color-pink-100),var(--color-pink-50))] text-pink-500">
                                <Icon name="user" size={20} strokeWidth={2}  />
                            </span>
                            <span className="hidden text-left sm:block">
                                <span className="block font-sans text-[11px] text-muted">Olá, {firstName}</span>
                                <span className="flex items-center gap-1 font-display text-[13px] font-semibold text-ink">
                                    Dashboard
                                    <Icon name="chevronDown" size={14} strokeWidth={2} className="text-muted"  />
                                </span>
                            </span>
                        </Link>
                        <button className="ml-1.5 flex items-center gap-3 rounded-lg border border-pink-100
                                          bg-pink-50 py-2 pl-3 pr-3.5 transition-colors hover:bg-pink-100">
                            <span className="relative text-pink-500">
                                <Icon name="cart" size={23} strokeWidth={2}  />
                                <span className="absolute -right-2 -top-1.75 flex h-4.5 min-w-4.5 items-center
                                        justify-center rounded-full bg-pink-500 px-1 font-sans text-[10px]
                                        font-semibold text-white">
                                    1
                                </span>
                            </span>
                            <span className="hidden text-left sm:block">
                                <span className="block font-sans text-[11px] text-muted">Meu carrinho</span>
                                <span className="font-display text-[14px] font-bold text-ink">
                                    R$ 249,00
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <nav className="border-b border-line-soft bg-surface">
                <div className="mx-auto flex h-13.5 max-w-[1600px] items-center gap-2 px-6 lg:px-10">
                    <button className="flex h-9.5 items-center gap-2.5 rounded-md  bg-ink px-4.5 font-sans
                                 text-[13.5px] font-semibold text-white">
                        <Icon name="dash" size={17} strokeWidth={2}  />
                        Todas as Categorias
                        <Icon name="chevronDown" size={15} strokeWidth={2}  />
                    </button>
                    <div className="hidden items-center gap-1 lg:flex">
                        {categories.slice(0, 4).map((c) => (
                            <Link
                                href="/"
                                key={c}
                                className="flex h-9.5 items-center rounded-md px-3.5 font-sans text-[13.5px]
                                    font-medium text-ink-soft hover:text-pink-500"
                            >
                                {c}
                            </Link>
                        ))}
                    </div>
                    <div className="ml-auto hidden items-center gap-2 font-sans text-[13px] font-medium text-success
                                    md:flex">
                        <Icon name="box" size={16} strokeWidth={2}  />
                        Venha vender conosco
                    </div>
                </div>
            </nav>
        </>
    )
}

export function StoreFooter() {
    const cols = [
        { title: "Links Rápidos", items: ["Informações do Perfil", "Lista de Desejos", "Produtos Novos", "Mais Vendidos", "Acomanhar Ordem"]},
        { title: "Outros", items: ["Sobre a Loja", "Termos & Condições", "Politica de Privacidade", "Politica de Estorno", "Politica de Troca"]}
    ]

    return (
        <footer className="mt-14 bg-ink text-[#B3B0BD]">
            <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2
                              lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] lg:px-10">
                <div>
                    <div className="mb-4 font-display text-[26px] font-extrabold tracking-[-0.02em] text-white">
                        Cris <span className="text-pink-500">Laços</span>
                    </div>
                    <p className="m-0 max-w-70 font-sans text-[13.5px] leading-[1.6] text-[#8B8895]">
                        Uma importante loja de acessórios para deixar você ainda mais bonita.
                    </p>
                </div>
                {cols.map(col => (
                    <div key={col.title}>
                        <div className="mb-4.5 font-display text-[14px] font-semibold text-white">
                            {col.title}
                        </div>
                        <div className="flex flex-col gap-3 font-sans text-[13.5px]">
                            {col.items.map((item) => (
                                <Link href="/" key={item} className="text-[#8B8895] hover:text-white">
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                <div>
                    <div className="mb-4.5 font-display text-[14px] font-semibold text-white">Novidades</div>
                    <p className="m-0 mb-3.5 font-sans text-[13px] leading-normal text-[#8B8895]">
                        Se inscreva para receber atualizações por email.
                    </p>
                    <div className="flex h-11.5 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                        <input
                            placeholder="Coloque seu email aqui"
                            className="min-w-0 flex-1 border-none bg-transparent px-3.5 font-sans text-[13.5px]
                            text-white outline-none"
                        />
                        <button className="bg-pink-500 px-4.5 font-sans text-[13px] font-semibold text-white
                                      transition-colors hover:bg-pink-600">
                            Inscreva-se
                        </button>
                    </div>
                </div>
            </div>
            <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 border-t
                                     border-white/10 px-6 py-7 lg:px-10">
                <div className="flex items-center gap-2 font-sans text-[13px] text-[#8B8895]">
                    <Icon name="pin" size={15} strokeWidth={2} className="text-pink-500" />
                    Centro, São Paulo-SP, Brasil
                </div>
                <div className="font-sans text-[12.5px] text-[#6C6976]">
                    © 2026 Cris Laços. Todos os Direitos Reservados.
                </div>
            </div>
        </footer>
    )
}
