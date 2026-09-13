"use client"

import {useState} from "react";

const faqs = [
    {
        q: "Como eu me cadastro como vendedor?",
        a: "Preencha os dados para a conta no cadastro de vendedores com seu nome, email e uma senha."
    },
    {
        q: "Como eu carrego os produtos?",
        a: "Uma vez aprovado como vendedor, você adiciona um produto no dashboard com detalhes, imagens, preço e estoque.",
    },
    {
        q: "Quais são as taxas para vendedor?",
        a: "Cris Laços cobra uma pequena taxa de comissão"
    },
    {
        q: "Como eu respondo as duvidas dos compradores?",
        a: "As questões dos compradores são respondidas com suporte de agente de IA."
    },
    {
        q: "Como e quando eu sou pago?",
        a: "Os ganhos acumulados em sua conta podem ser retirados através de uma conta STRIPE"
    }
]

export default function VendorFaq() {
    const [open, setOpen] = useState<number | null>(0)

    return (
        <div className="flex flex-col gap-3 text-left">
            {faqs.map((f, i) => {
                const isOpen = open === i

                return (
                    <div key={f.q} className="overflow-hidden rounded-lg border border-line-soft bg-surface">
                        <button
                            type="button"
                            onClick={() => setOpen(isOpen ? null : i)}
                            className="flex w-full items-center justify-between gap-4 p-[18px_22px] text-left"
                        >
                            <span className="font-sans text-[14.5px] font-semibold leading-[1.3] text-ink">
                                {f.q}
                            </span>
                            <span
                                className={`flex h-7.5 w-7.5 flex-none items-center justify-center rounded-md ${
                                    isOpen ? "bg-pink-500 text-white" : "bg-[#F3F2F6] text-muted"
                                }`}
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2.4}
                                    strokeLinecap="round"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    {!isOpen && <line x1="12" y1="5" x2="12" y2="19" />}
                                </svg>
                            </span>
                        </button>
                        {isOpen && (
                            <div className="p-[0_22px_20px] font-sans text-[13.5px] leading-[1.6] text-muted">
                                {f.a}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
