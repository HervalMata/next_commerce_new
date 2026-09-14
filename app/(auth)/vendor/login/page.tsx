import type {Metadata} from "next";
import VendorLoginForm from "@/components/auth/VendorLoginForm";
import Link from "next/link";

export const metadata: Metadata = { title: "Vendor Login" };

export default function VendorLoginPage() {
    return (
        <div className="flex min-h-screen">
            <div className="relative hidden flex-1 flex-col justify-center overflow-hidden bg-bg-dash px-[7%] py-16
                            lg:flex">
                <div className="mb-15 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-pink-500 text-white">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </span>
                    <span className="font-display text-[30px] font-extrabold tracking-[-0.02em] text-ink">
                        Cris <span className="text-pink-500">Laços</span>
                    </span>
                </div>
                <h1 className="m-0 max-w-140 font-display text-[56px] font-extrabold tracking-[1.05] text-ink">
                    Faça seu negócio <span>Rentável...</span>
                </h1>
                <p className="mb-10 mt-6.5 max-w-110 font-sans text-[16px] leading-[1.6] text-muted">
                    Vendas milhões na nossa loja.Mostre seus produtos e veja suas vendas crecerem.
                </p>
                <div className="flex aspect-video w-full max-w-130 items-center justify-center rounded-xl border
                               border-dashed border-[#C9C6D3] bg-[#EAE8F0]">
                    <span className="px-6 text-center font-mono text-[12px] leading-[1.4] text-muted-soft">
                        Vendedor imagem
                    </span>
                </div>
            </div>

            <div className="flex flex-1 items-center justify-center px-[7%] py-12">
                <div className="w-full max-w-110">
                    <div className="mb-8 flex items-center gap-2 lg:hidden">
                        <span className="font-display text-[26px] font-extrabold tracking-[-0.02em] text-ink">
                            Cris <span className="text-pink-500">Laços</span>
                        </span>
                    </div>
                    <h2 className="m-0 font-display text-[30px] font-extrabold tracking-[-0,01em] text-ink">
                        Entre
                    </h2>
                    <div className="mb-9 mt-4 font-sans text-[15px] font-semibold text-ink">
                        Benvindo e Entre como Vendedor
                    </div>
                    <VendorLoginForm />
                    <p className="mt-6 font-sans text-[13px] text-muted">
                        Novo na Cris Laços?{" "}
                        <Link href="/vendor/register" className="font-semibold text-pink-500 hover:text-pink-600">
                            Crie sua Conta
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
