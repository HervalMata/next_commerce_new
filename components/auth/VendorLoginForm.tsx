"use client"

import {useActionState, useEffect} from "react";
import {FormState, login} from "@/lib/auth-actions";
import toast from "react-hot-toast";
import {PasswordField, SubmitButton, TextField} from "@/components/auth/AuthFields";
import Link from "next/link";

export default function VendorLoginForm() {
    const [state, formAction, pending] = useActionState<FormState | undefined, FormData>(
        login, undefined
    )

    useEffect(() => {
        if (state?.error) toast.error(state.error)
    }, [state])

    return (
        <form action={formAction} className="w-full" noValidate>
            <div className="mb-5.5">
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
                    placeholder="Digite sua senha"
                    autoComplete="new-password"
                    error={state?.fieldErrors?.password}
                />
            </div>

            <div className="mb-7 flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2.25">
                    <input
                        type="checkbox"
                        name="remember"
                        className="h-4.75 w-4.75 flex-none rounded-[6px] border-[1.5px] border-[#D6D4DD]
                                  accent-pink-500"
                    />
                    <span className="font-sans text-[13px] font-medium text-ink-soft">Lembrar-me</span>
                </label>
                <Link className="font-sans text-[13px] font-semibold text-pink-500 hover:text-pink-600"
                    href="/vendor/register">
                    Cadastrar uma conta
                </Link>
            </div>

            <SubmitButton pending={pending} className="h-13.5 text-[15px]">
                {pending ? "Entrando..." : "Entrar"}
            </SubmitButton>
        </form>
    )
}
