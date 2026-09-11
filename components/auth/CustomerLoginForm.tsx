"use client"

import {useActionState, useEffect} from "react";
import {type FormState, login} from "@/lib/auth-actions";
import toast from "react-hot-toast";
import {PasswordField, SubmitButton, TextField} from "@/components/auth/AuthFields";
import Link from "next/link";

export function CustomerLoginForm() {
    const [state, formAction, pending] = useActionState<FormState | undefined, FormData>(login, undefined)

    useEffect(() => {
        if (state?.error) toast.error(state.error)
    }, [state])

    return (
        <form action={formAction} className="flex flex-col" noValidate>
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
            <div className="mb-4">
                <PasswordField
                    label="Senha"
                    name="password"
                    placeholder="Digite seu senha"
                    autoComplete="current-password"
                    error={state?.fieldErrors?.password}
                />
            </div>
            <label className="mb-6.5 flex cursor-pointer items-center gap-2.25">
                <input
                    type="checkbox"
                    name="remember"
                    className="font-sans text-[13px] font-medium text-ink-soft"
                />
                <span className="font-sans text-[13px] font-medium text-muted">Lembrar-me</span>
            </label>
            <SubmitButton pending={pending}>
                {pending ? "Entrando..." : "Entrar"}
            </SubmitButton>
            <p className="mt-7 text-center font-sans text-[13.5px] text-ink-soft">
                Não tem uma conta?{" "}
                <Link href="/register" className="font-semibold text-pink-500 hover:text-pink-600">
                    Cadastrar
                </Link>
            </p>
        </form>
    )
}
