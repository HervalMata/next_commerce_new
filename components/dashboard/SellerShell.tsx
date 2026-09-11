"use client"

import {Icon, IconName} from "@/components/dashboard/Icon";
import {ReactNode, useState} from "react";
import {signOutAction} from "@/lib/auth-actions";

const RAIL: IconName[] = ["home", "box", "bag", "send", "speaker", "chart", "users", "sliders"]

export function SellerShell(
    {
        variant,
        userName,
        userEmail,
        signOutTo,
        setupPercent,
        showSearch = false,
        notifyCount,
        children,
    }: {
        variant: "vendor" | "admin";
        userName: string;
        userEmail: string;
        signOutTo: string;
        setupPercent: number;
        showSearch?: boolean;
        notifyCount: number;
        children: ReactNode;
    }
) {
    const [open, setOpen] = useState(true)
    const [profileOpen, setProfileOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-bg-dash">
            {open && (
                <div className="sticky top-0 flex h-screen w-16 flex-none flex-col items-center gap-2 bg-ink py-4">
                    <div className="bg-3.5 flex h-9.5 w-9.5 items-center justify-center rounded-md bg-pink-500 text-white">
                        <Icon name="cart" size={20} strokeWidth={2} />
                    </div>
                    {RAIL.map((name, i) => (
                        <button
                            key={name}
                            type="button"
                            aria-label={name}
                            className={`flex h-10 w-10 items-center justify-center rounded-md transition-all ${
                                i === 0 ? "bg-pink-500 text-white" : "text-[#8B8895] hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <Icon name={name} size={20} />
                        </button>
                    ))}
                </div>
            )}

            {open && (
                <aside className="sticky top-0 h-screen w-59 flex-none overflow-y-auto border-r border-line
                                bg-surface p-[20px_16px]">
                    <div className="mb-4 flex items-center gap-2.5 border-b border-line-soft px-2 pb-5">
                        <span className="flex h-8.5 w-8.5 items-center justify-center rounded-md bg-pink-50 text-pink-500">
                            <Icon name="house" size={18} strokeWidth={2} />
                        </span>
                        <span className="font-display text-[16px] font-bold text-ink">Home</span>
                    </div>
                    <div className="mb-2.5 px-2 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-soft">
                        Resumo
                    </div>
                    <div className="flex flex-col gap-0.75">
                        <a href="#" className="flex items-center gap-2.5 rounded-md px-3 py-2.5 font-sans
                                         text-[13.5px] font-medium text-ink-soft transition-colors hover:bg-field">
                            <Icon name="dash" size={17} />
                            Dashboard
                        </a>
                        <a href="#" className="flex items-center gap-2.5 rounded-md px-3 py-2.5 font-sans
                                         text-[13.5px] font-medium text-ink-soft transition-colors hover:bg-field">
                            <Icon name="pos" size={17} />
                            POS
                        </a>
                    </div>
                    <div className="mt-22px] rounded-lg bg-[linear-gradient(135deg,var(--color-pink-500),var(--color-pink-700))] p-4 text-white">
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-8.5 w-8.5 flex-none items-center justify-center rounded-md bg-white/16">
                                <Icon name="check" size={18} strokeWidth={2} />
                            </span>
                            <div>
                                <div className="font-display text-[13px] font-semibold">Setup</div>
                                <div className="mt-1 font-sans text-[11px] text-white/75">{setupPercent}% Completo</div>
                            </div>
                        </div>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
                            <div className="h-full rounded-full bg-white" style={{ width: `${setupPercent}%` }} />
                        </div>
                    </div>
                </aside>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-line bg-surface px-6.5">
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        aria-label="Sidebar"
                        className="flex h-7.5 w-7.5 items-center justify-center rounded-md border border-line
                                 bg-surface text-muted transition-colors hover:bg-field"
                    >
                        <Icon name={open ? "chevronLeft" : "menu"} size={15} strokeWidth={2} />
                    </button>
                    <div className="flex items-center gap-2 font-sans text-[13px] font-medium">
                        <span className="text-pink-500">Home</span>
                        <Icon name="chevronRight" size={14} strokeWidth={2} className="text-[#C6C4CE]" />
                        <span className="text-muted">Dashboard</span>
                    </div>

                    {showSearch && (
                        <div className="ml-3.5 hidden h-10 max-w-105 flex-1 items-center overflow-hidden rounded-md
                                       border bg-field focus:focus-within:border-pink-500 md:flex">
                            <span className="px-3 text-muted-soft">
                                <Icon name="search" size={16} strokeWidth={2} />
                            </span>
                            <input placeholder="Pesquisando..."
                                   className="min-w-0 flex-1 border-none bg-transparent px-1 font-sans text-[13px]
                                           text-ink outline-none"
                                   type="text"
                            />
                        </div>
                    )}

                    <div className="ml-auto flex items-center gap-2">
                        {variant === "vendor" && (
                            <button
                                className="flex h-9.5 w-9.5 items-center justify-center rounded-md border border-line
                                     bg-surface text-muted transition-colors hover:bg-field hover:text-pink-500"
                                aria-label="Visite a Loja"
                                type="button">
                                <Icon name="globe" size={18} />
                            </button>
                        )}
                        <button
                            className="flex h-9.5 w-9.5 items-center justify-center rounded-md border border-line
                                     bg-surface text-muted transition-colors hover:bg-field hover:text-pink-500"
                            aria-label="Notificações"
                            type="button">
                            <Icon name="bell" size={18} />
                            <span className="absolute -right-1.25 -top-1.25 flex h-4.25 min-w-4.25 items-center
                                           justify-center rounded-full bg-danger px-1 font-sans text-[10px]
                                           font-semibold text-white">
                                {notifyCount}
                            </span>
                        </button>
                        <button
                            className="flex h-9.5 w-9.5 items-center justify-center rounded-md border border-line
                                     bg-surface text-muted transition-colors hover:bg-field hover:text-pink-500"
                            aria-label="Mensagens"
                            type="button">
                            <Icon name="message" size={18} />
                        </button>
                        <button
                            className="flex h-9.5 w-9.5 items-center justify-center rounded-md border border-line
                                     bg-surface text-muted transition-colors hover:bg-field hover:text-pink-500"
                            aria-label="Tela cheia"
                            type="button">
                            <Icon name="maximize" size={17} strokeWidth={2} />
                        </button>

                        <div className="relative ml-1.5" onMouseLeave={() => setProfileOpen(false)}>
                            <button
                                className="flex h-11 items-center gap-2.5 rounded-full border border-line py-0 pl-1.5
                                     bg-surface pr-2 transition-colors hover:bg-field"
                                onClick={() => setProfileOpen((p) => !p)}
                                type="button">
                                <span className="flex h-8.5 w-8.5 flex-none items-center justify-center rounded-full
                                bg-[linear-gradient(135deg,var(--color-iris-100),var(--color-iris-50))] text-pink-500">
                                    <Icon name="user" size={18} strokeWidth={2} />
                                </span>
                                <span className="hidden text-left sm:block">
                                    <span className="block font-display text-[13px] font-semibold text-ink">
                                        {userName.split(" ")[0]}
                                    </span>
                                    <span className="mt-1 block font-sans text-[11px] text-muted-soft">
                                        {variant === "admin" ? "Master Admin" : userEmail}
                                    </span>
                                </span>
                                <Icon name="chevronDown" size={15} strokeWidth={2} className="text-muted" />
                            </button>

                            <div className={`absolute right-0 top-full z-60 w-59 pt-2.5 transition ${
                                profileOpen ? 
                                    "visible translate-y-0 opacity-100" : 
                                    "pointer-events-none invisible -translate-y-1.5 opacity-0"
                            }`}>
                                <div className="rounded-lg border border-line-soft bg-surface p-1.5 shadow-lg">
                                    <div className="mb-1.5 flex items-center gap-3 border-b border-line-soft px-3.5 py-3">
                                        <span className="flex h-9.5 w-9.5 flex-none items-center justify-center
                                     rounded-md bg-[linear-gradient(135deg,var(--color-iris-100),var(--color-iris-50))]
                                             text-pink-500">
                                            <Icon name="user" size={19} strokeWidth={2} />
                                        </span>
                                        <div className="min-w-0">
                                            <div className="truncate font-display text-[13.5px] font-bold text-ink">
                                                {userName}
                                            </div>
                                            <div className="mt-1 truncate font-sans text-[11px] text-muted-soft">
                                                {userEmail}
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#"
                                        className="flex items-center gap-3 rounded-md px-3.5 py-2.5 font-sans
                                      text-[13.5px] font-medium text-link-soft hover:bg-pink-50 hover:text-pink-500"
                                    >
                                        <Icon name="user" size={17} />
                                        Configurações de Perfil
                                    </a>
                                    <a href="#"
                                       className="flex items-center gap-3 rounded-md px-3.5 py-2.5 font-sans
                                      text-[13.5px] font-medium text-link-soft hover:bg-pink-50 hover:text-pink-500"
                                    >
                                        <Icon name={variant === "admin" ? "settings" : "lock"} size={17} />
                                        {variant === "admin" ? "Configurações" : "Alterar Senha"}
                                    </a>
                                    <form action={signOutAction.bind(null, signOutTo)}
                                        className="mt-0.5 border-t border-line-soft pt-1.5"
                                    >
                                        <button type="submit"
                                            className="flex w-full items-center gap-3 rounded-md px-3.5 py-2.5 font-sans
                                                 text-[13.5px] font-semibold text-danger hover:bg-error-bg"
                                        >
                                            <Icon name="logout" size={17} />
                                            Sair
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-300 p-6.5">{children}</div>
            </div>
        </div>
    )
}
