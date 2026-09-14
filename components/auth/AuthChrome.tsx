import Link from "next/link";

export function AuthTopbar() {
    return (
        <header className="sticky top-0 z-40 border-b border-line-soft bg-surface">
            <div className="mx-auto flex h20 max-w-310 items-center gap-7 px-8">
                <Link href="/"
                      className="flex-none font-display text-[27px] font-extrabold tracking-[-0.02em] text-ink">
                    Cris <span className="text-pink-500">Laços</span>
                </Link>
                <nav className="ml-2 hidden items-center gap-1 md:flex">
                    <Link href="/"
                          className="flex h-9.5 items-center rounded-lg px-3.5 font-sans text-[13.5px] font-medium
                          text-ink-soft hover:text-pink-500">
                        Home
                    </Link>
                    <Link href="/vendor/register"
                          className="flex h-9.5 items-center rounded-lg px-3.5 font-sans text-[13.5px] font-medium
                          text-ink-soft hover:text-pink-500">
                        Vender Na Cris Laços
                    </Link>
                    <Link href="/vendor/login"
                          className="ml-auto flex h-11 items-center gap-2 rounded-md bg-pink-500 px-5.5 font-display
                          text-[13px] font-bold transition-colors text-white hover:text-pink-600">
                        Vendedor Entre Aqui
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export function AuthFooter() {
    return (
        <footer className="mt-14 bg-ink text-[#B3B0BD]">
            <div className="mx-auto flex max-w-310 flex-col items-center justify-between gap-4 px-8 py-8 sm:flex-row">
                <div className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-white">
                    Cris <span className="text-pink-400">Laços</span>
                </div>
                <div className="font-sans text-[12.5px] text-[#6C6976]">
                    © 2026 Cris Laços. Todos os Direitos Reservados.
                </div>
            </div>
        </footer>
    )
}
