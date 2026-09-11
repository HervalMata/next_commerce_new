"use client"

import {useActionState, useEffect, useState} from "react";
import {type FormState, registerCustomer} from "@/lib/auth-actions";
import toast from "react-hot-toast";
import {PasswordField, SubmitButton, TextField} from "@/components/auth/AuthFields";
import Link from "next/link";

export default function CustomerRegisterForm() {
    const [state, formAction, pending] = useActionState<FormState | undefined, FormData>(
        registerCustomer, undefined
    )
    const [agreed, setAgreed] = useState(false)

    useEffect(() => {
        if (state?.error) toast.error(state.error)
    }, [state])

    return (
        <form action={formAction} className="flex flex-col" noValidate>
            <div className="mb-5">
                <TextField
                    label="Nome"
                    name="name"
                    type="name"
                    placeholder="Seu nome completo"
                    autoComplete="name"
                    error={state?.fieldErrors?.name}
                />
            </div>
            <div className="mb-5">
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="your@example.com"
                    autoComplete="email"
                    error={state?.fieldErrors?.email}
                />
            </div>
            <div className="mb-5.5">
                <PasswordField
                    label="Senha"
                    name="password"
                    placeholder="Digite seu senha"
                    autoComplete="current-password"
                    error={state?.fieldErrors?.password}
                />
            </div>
            <label className="mb-6 flex cursor-pointer items-start gap-2.25">
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-px h-4.75 w-4.75 flex-none rounded-[6px] border-[1.5px] font-sans text-[13px]
                                 border-pink-500 accent-pink-500"
                />
                <span className="font-sans text-[12.5px] leading-normal text-muted">
                    Eu concordo com nossos{" "}
                    <span className="font-semibold text-pink-500">Termos</span> e{" "}
                    <span className="font-semibold text-pink-500">Politica de Privacidade</span>.
                </span>
            </label>

            <SubmitButton pending={pending || !agreed}>
                {pending ? "Cadastrando..." : "Cadastrar"}
            </SubmitButton>

            <p className="mt-7 text-center font-sans text-[13.5px] text-muted">
                Já tem uma conta?{" "}
                <Link href="/login" className="font-semibold text-pink-500 hover:text-pink-600">
                    Entrar
                </Link>
            </p>
        </form>
    )
}
