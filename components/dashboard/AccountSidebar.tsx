"use client"

import {Icon, type IconName} from "@/components/dashboard/Icon";
import {useState} from "react";
import {signOutAction} from "@/lib/auth-actions";

const navDefs: { k: string; label: string; icon: IconName; badge?: string }[] = [
    { k: "Profile", label: "Informações do Perfil", icon: "user" },
    { k: "orders", label: "Minhas Ordens", icon: "box", badge: "8" },
    { k: "restock", label: "Requisições de Extorno", icon: "refresh" },
    { k: "wishlist", label: "Lista de Desejos", icon: "heartLine", badge: "5" },
    { k: "wallet", label: "Meus Pagamentos", icon: "wallet" },
    { k: "loyalty", label: "Meus Pontos", icon: "award" },
    { k: "inbox", label: "Caixa de Mensagens", icon: "mail", badge: "3" },
    { k: "address", label: "Meus Enderêços", icon: "pin" },
    { k: "support", label: "Requisições de Suporte", icon: "life" },
    { k: "refer", label: "Extornos e Ganhos", icon: "share" },
    { k: "coupons", label: "Cupons de Desconto", icon: "ticket" },
    { k: "truck", label: "Ratrear Ordens", icon: "truck" },
]

export function AccountSidebar(
    {
        name,
        email
    }: {
        name: string;
        email: string;
    }
) {
    const [active, setActive] = useState("profile")

    return (
        <aside className="sticky top-24 rounded-2xl border border-line-soft bg-surface p-3.5 shadow-xs">
            <div className="mb-2 flex items-center gap-3 border-b border-line-soft px-3 pb-4 pt-3">
                <span className="flex h-11.5 w-11.5 flex-none items-center justify-center rounded-lg
                                 bg-[linear-gradient(135deg,var(--color-pink-100),var(--color-pink-50))] text-pink-500">
                    <Icon name="user" size={24} strokeWidth={2} />
                </span>
                <div className="min-w-0">
                    <div className="font-display text-[15px] font-bold leading-[1.1] text-ink">{name}</div>
                    <div className="mt-1.5 truncate font-sans text-[12px] text-muted-soft">{email}</div>
                </div>
            </div>

            <div className="flex flex-col gap-0.5">
                {navDefs.map((n) => {
                    const on = active === n.k
                    return (
                        <button
                            key={n.k}
                            type="button"
                            onClick={() => setActive(n.k)}
                            className={`flex items-center gap-3 rounded-md px-3.5 py-2.5 text-left font-sans 
                                       text-[13.5px] transition-colors ${
                                          on ? "bg-pink-50 font-semibold text-pink-500" 
                                              : "font-medium text-ink-soft hover:bg-field"
                            }`}
                        >
                            <span
                                className={`flex h-7.5 w-7.5 flex-none items-center justify-center rounded-md ${
                                    on ? "bg-pink-500 text-white" : "bg-[#F3F2F6] text-[#6E6E7C]"
                                }`}
                            >
                                <Icon name={n.icon} size={17} />
                            </span>
                            <span className="flex-1">
                                {n.label}
                            </span>
                            <span>
                                {n.badge && (
                                    <span
                                        className="flex h-5.5 min-w-5.5 items-center justify-center rounded-full
                                              bg-pink-100 px-1.5 font-sans text-[11px] font-semibold text-accent-fg"
                                    >
                                        {n.badge}
                                    </span>
                                )}
                            </span>
                        </button>
                    )
                })}
            </div>

            <div className="mt-2.5 border-t border-line-soft pt-3.5">
                <form action={signOutAction.bind(null, "/login")}>
                    <button
                        type="submit"
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-sans text-[13.5px]
                                  font-semibold text-danger transition-colors hover:bg-error-bg"
                    >
                        <Icon name="logout" size={28} strokeWidth={2} />
                        Sair
                    </button>
                </form>
            </div>
        </aside>
    )
}
