const features = [
    {
        label: "Entrega Grátis em compras acima de R$ 50,00",
        icon: (
            <>
                <rect x="1" y="3" width="15" height="13" />
                <path d="M16 8h4l3 3V5h-7VBz" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
            </>
        )
    },
    {
        label: "Pagamento seguro com Stripe",
        icon: (
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        )
    },
    {
        label: "7 dias para devoluções",
        icon: (
            <>
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </>
        )
    },
]

export function BrandPanel() {
    return (
        <div className="bg-brand-gradient relative flex min-h-130 flex-col justify-between overflow-hidden
                    rounded-2xl p-[52px_48px]">
            <div className="absolute -right-10 -top-17.5 h-70 w-70 rounded-full bg-white/[0.07]" />
            <div className="absolute -bottom-22.5 -left-7.5 h-55 w-55 rounded-full bg-white/5" />
            <div className="relative">
                <div className="font-display text-[28px] font-extrabold tracking-[-0.02em] text-white">
                    Cris <span className="text-pink-300">Laços</span>
                </div>
                <p className="mt-4.5 max-w-[320px] font-sans text-[14px] leading-normal text-white/75">
                    De tudo para te deixar ainda mais bonita
                </p>
            </div>

            <div className="relative flex flex-col gap-20">
                {features.map((f) => (
                    <div key={f.label} className="flex items-center gap-3 text-white">
                        <span className="flex h-9.5 w-9.5 flex-none items-center justify-center rounded-md bg-white/[0.14]">
                            <svg
                                width="19"
                                height="19"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {f.icon}
                            </svg>
                        </span>
                        <span className="font-sans text-[13.5px] font-medium leading-[1.4]">
                            {f.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
