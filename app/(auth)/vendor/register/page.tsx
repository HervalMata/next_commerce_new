import type { Metadata } from 'next';
import Link from "next/link";
import VendorRegisterForm from "@/components/auth/VendorRegisterForm";
import {ReactNode} from "react";
import VendorFaq from "@/components/auth/VendorFaq";

export const metadata: Metadata = { title: "Vendor Registration" };

const perks = [
    {
        title: "Navegação Fácil",
        desc: "Comece a vender rapidamente com nosso processo de navegação amigavel desenhado para levar o cliente pelo melhor caminho.",
        icon: (
            <>
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91 0z" />
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            </>
        )
    },
    {
        title: "Suporte 24/7",
        desc: "Tenha suporte instantaneo com nossa equipe dedicada para resolver qualquer duvida ou dificuldade a qualquer tempo.",
        icon: (
            <>
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </>
        )
    },
    {
        title: "SEO Amigavel",
        desc: "Desfrute visibilidade na procura com nossa plataforma de SEO amigavel, conduzindo maior tráfico para suas vendas.",
        icon: (
            <>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </>
        )
    },
    {
        title: "Marketing Grátis",
        desc: "Se beneficie da nossa extensiva, sem custo ofertas de marketing para incrementar a visibilidade e vendas.",
        icon: (
            <>
                <path d="m3 11 18-5v12L3 14v-3z" />
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </>
        )
    },
]

const steps = [
    {
        title: "Registre-se",
        desc: "Cadastre-se facilmente e crie sua conta em poucos minutos. È rápido e simples para comecar.",
        icon: (
            <>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="15" x2="15" y2="15" />
            </>
        )
    },
    {
        title: "Carregue seus produtos",
        desc: "Liste seus produtos comdescrições detalhadas e alta qualidade nas imagens para atrair mais compradores.",
        icon: (
            <>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
            </>
        )
    },
    {
        title: "Comece a Vender",
        desc: "Conheça milhares de potenciais compradores imediatamente.Veja suas vendas crescer.",
        icon: (
            <>
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </>
        )
    }
]

function Icon(
    {
        children,
        sw = 1.8
    }: {
        children: ReactNode;
        sw?: number;
    }
) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {children}
        </svg>
    )
}

export default function VendorRegisterPage() {
    return (
        <div className="bg-bg">
            <header className="sticky top-0 z-40 border-b border-line-soft bg-surface">
                <div className="mx-auto flex h-18 max-w-310 items-center gap-7 px-8">
                    <Link href="/" className="flex-none font-display text-[26px] font-extrabold tracking-[-0.02em]
                                     text-ink">
                        Cris <span className="text-pink-500">Laços</span>
                    </Link>
                    <nav className="ml-2 hidden items-center gap-1.5 md:flex">
                        {["Home", "Marcas", "Ofertas", "Vendedores", "Cartão de Presente"].map((l) => (
                            <Link className="flex h-9 items-center rounded-lg px-3.5 font-sans text-[13.5px]
                                             font-medium text-ink-soft hover:text-pink-500"
                                key={l} href="/">
                                {l}
                            </Link>
                        ))}
                    </nav>
                    <Link className="ml-auto flex h-11 items-center gap-2 rounded-md bg-pink-500 px-5.5 font-display
                                   text-[13px] font-bold text-white transition-colors hover:bg-pink-600"
                        href="/">
                        Login Dos Vendedores
                    </Link>
                </div>
            </header>

            <section className="bg-brand-gradient-soft border-b border-line-soft">
                <div className="mx-auto grid max-w-310 grid-cols-1 items-center gap-10 px-8 py-13 lg:grid-cols-[340px_1fr]">
                    <div>
                        <h1 className="m-0 font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.01em]
                                    text-ink">
                            Cadastro de Vendedores
                        </h1>
                        <p className="mb-5 mt-3.5 font-sans text-[14px] leading-normal text-muted">
                            Crie sua conta.{" "}
                            <Link className="font-semibold text-pink-500 hover:text-pink-600"
                                href="/vendor/login">
                                Entre
                            </Link>
                        </p>
                        <div className="flex aspect-4/3 w-full items-center justify-center rounded-xl border
                                        border-dashed border-[#C9C6D3] bg-[#EAE8F0]">
                            <span className="font-mono text-[12px] text-muted-soft">Foto do Vendedor</span>
                        </div>
                    </div>
                    <div className="rounded-xl border border-line-soft bg-surface p-[30px_36px]
                                    shadow-[0_12px_34px_-18px_rgba(20,18,31,0.2)]">
                        <VendorRegisterForm />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-310 px-8 pt-16 text-center">
                <h2 className="m-0 font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.01em] text-ink">
                    Por quê Vender conosco?
                </h2>
                <p className="mb-10 mt-3.5 font-sans text-[15px] leading-normal text-muted">
                    Aumente suas vendas! Junte-se a nós, viva essa experiência
                </p>
                <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
                    {perks.map((p) => (
                        <div className="rounded-xl border border-line-soft bg-surface p-[26px_24px] shadow-xs
                                 transition-[box-shadow,transform] duration-200 hover:-translate-y-0.75 hover:shadow-md"
                            key={p.title}>
                            <span className="mb-4.5 flex h-13 w-13 items-center justify-center rounded-lg bg-pink-50
                                            text-pink-500">
                                <Icon>{p.icon}</Icon>
                            </span>
                            <div className="font-display text-[16px] font-bold leading-[1.2] text-ink">
                                {p.title}
                            </div>
                            <div className="mt-2.5 font-sans text-[13px] leading-normal text-muted">
                                {p.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-brand-gradient mt-16">
                <div className="mx-auto max-w-310 px-8 py-14 text-center">
                    <h2 className="m-0 font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.01em]
                                    text-white">
                        3 Passos Faceis para começar a vender
                    </h2>
                    <p className="mx-auto mb-11 mt-3.5 max-w-130 font-sans text-[15px] leading-normal text-white/75">
                        Cadastre-se, e venda seus produtos com detalhadas informações e imagens e tenha muitas vendas
                                instantaneamente.
                    </p>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {steps.map((s) => (
                            <div key={s.title}>
                                <span className="mx-auto mb-4.5 flex h-16 w-16 items-center justify-center rounded-xl
                                        bg-white/12 text-white">
                                    <Icon>{s.icon}</Icon>
                                </span>
                                <div className="font-display text-[18px] font-bold leading-[1.2] text-white">
                                    {s.title}
                                </div>
                                <div className="mx-auto mt-2.5 max-w-70 font-sans text-[13px] leading-[1.6]
                                         text-white/70">
                                    {s.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-240 px-8 pt-16 text-center">
                <h2 className="m-0 font-display text-[30px] font-extrabold leading-[1.1] tracking-[-0.01em] text-ink">
                    Qustões Frequentemente Perguntadas
                </h2>
                <p className="mb-9 mt-3.5 font-sans text-[15px] leading-normal text-muted">
                    Veja questões sobre como começar a vender, Explore nossa FAQ para responder duvidas comuns junto
                         a nossa plataforma
                </p>
                <VendorFaq />
            </section>

            <footer className="mt-16 bg-ink text-[#B3B0BD]">
                <div className="mx-auto grid max-w-310 grid-cols-1 items-center gap-10 px-8 py-14 sm:grid-cols-2
                               lg:grid-cols-[1.6fr_1fr_1fr]">
                    <div>
                        <div className="mb-4 font-display text-[24px] font-extrabold tracking-[-0.02em] text-white">
                            Cris <span className="text-pink-400">Laços</span>
                        </div>
                        <p className="m-0 max-w-65 font-sans text-[13px] leading-[1.6] text-[#8B8895]">
                            Uma loja para deixar você ainda mais bonita.
                        </p>
                    </div>
                    <div>
                        <div className="mb-4 font-display text-[14px] font-semibold text-white">
                            Links Rápidos
                        </div>
                        <div className="flex flex-col gap-3 font-sans text-[13px]">
                            {["Informações do Perfil", "Produtos em Destaque", "Mais Vendidos", "Ratrear Ordem"].map((l) => (
                                <Link key={l} href="/" className="text-[#8B8895] hover:text-white">
                                    {l}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="mb-4 font-display text-[14px] font-semibold text-white">
                            Outros
                        </div>
                        <div className="flex flex-col gap-3 font-sans text-[13px]">
                            {["Sobre a Loja", "Termos & Condições", "Politica de Privacidade", "Politica de Troca"].map((l) => (
                                <Link key={l} href="/" className="text-[#8B8895] hover:text-white">
                                    {l}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/8 p-[22px_32px] text-center font-sans text-[12.5px]
                              text-[#6C6976]">
                    © 2026 Cris Laços. Todos os Direitos Reservados.
                </div>
            </footer>
        </div>
    )
}
