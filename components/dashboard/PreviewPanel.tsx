"use client"

import {createContext, ReactNode, useContext, useState} from "react";
import {Icon} from "@/components/dashboard/Icon";

type ViewState = "default" | "loading" | "empty" | "error"

const StateCtx = createContext<{
    state: ViewState;
    setState: (s: ViewState) => void;
}>({ state: "default", setState: () => {}})

const items: { k: ViewState; l: string }[] = [
    { k: "default", l: "Padrão" },
    { k: "loading", l: "carregando" },
    { k: "empty", l: "Vazio" },
    { k: "error", l: "Erro" },
]

export function StateProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<ViewState>("default")
    return (
        <StateCtx.Provider value={{ state, setState }}>{children}</StateCtx.Provider>
    )
}

export function StateTabs({ trackClass = "bg-line-soft" }: { trackClass?: string }) {
    const {state, setState} = useContext(StateCtx)

    return (
        <div className={`flex gap-1 rounded-md p-1 ${trackClass}`}>
            {items.map((t) => {
                const active = state === t.k
                return (
                    <button
                        key={t.k}
                        type="button"
                        onClick={() => setState(t.k)}
                        className={`h-7.5 rounded-md px-3.5 font-sans text-[12px] transition ${
                            active ? "bg-surface font-semibold text-ink shadow-xs" 
                                : "font-medium text-muted hover:text-ink" 
                        }`}
                    >
                        {t.l}
                    </button>
                )
            })}
        </div>
    )
}

export function StateView(
    {
        children,
        loading,
        empty,
        error,
    }: {
        children: ReactNode;
        loading: ReactNode;
        empty: { title: string; text: string; actionLabel?: string };
        error: { title: string; text: string; };
    }
) {
    const {state, setState} = useContext(StateCtx)
    if (state === "loading") return <>{loading}</>
    if (state === "empty") {
        return (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#DAD8E0]
                        bg-surface px-8 py-18 text-center">
                <span className="mb-5.5 flex h-19.5 w-19.5 items-center justify-center rounded-2xl bg-pink-50 text-pink-400">
                    <Icon name="trendUp" size={36} strokeWidth={1.6} />
                </span>
                <div className="font-display text-[20px] font-bold leading-[1.2] text-ink">{empty.title}</div>
                <p className="mx-auto mt-3 max-w-90 font-sans text-[14px] leading-normal text-muted">
                    {empty.text}
                </p>
                {empty.actionLabel && (
                    <button
                        type="button"
                        className="mt-6 h-11.25 rounded-md bg-pink-500 px-6 font-sans text-[13.5px]
                                        font-semibold text-white transition-colors hover:bg-pink-600"
                        onClick={() => setState("default")}>
                        {empty.actionLabel}
                    </button>
                )}
            </div>
        )
    }

    if (state === "error") {
        return (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#F6D9DA]
                        bg-surface px-8 py-18 text-center">
                <span className="mb-5.5 flex h-19.5 w-19.5 items-center justify-center rounded-2xl bg-pink-50 text-pink-400">
                    <Icon name="alert" size={36} strokeWidth={1.6} />
                </span>
                <div className="font-display text-[20px] font-bold leading-[1.2] text-ink">{error.title}</div>
                <p className="mx-auto mt-3 max-w-90 font-sans text-[14px] leading-normal text-muted">
                    {error.text}
                </p>
                        <button
                            type="button"
                            className="mt-6 flex h-11.25 items-center rounded-md bg-pink-500 px-6 font-sans text-[13.5px]
                                        font-semibold text-white transition-colors hover:bg-pink-600"
                            onClick={() => setState("default")}>
                            <Icon name="refresh" size={16} strokeWidth={2} />
                            Tente Novamente
                        </button>
            </div>
        )
    }
    return <>{children}</>
}
