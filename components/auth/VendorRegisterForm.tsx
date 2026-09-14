"use client"

import {useActionState, useEffect} from "react";
import {FormState, registerVendor} from "@/lib/auth-actions";
import toast from "react-hot-toast";
import {PasswordField, SubmitButton, TextField} from "@/components/auth/AuthFields";

export default function VendorRegisterForm() {
    const [state, formAction, pending] = useActionState<FormState | undefined, FormData>(
        registerVendor, undefined
    )

    useEffect(() => {
        if (state?.error) toast.error(state.error)
    }, [state])

    return (
            <form action={formAction} noValidate>
                <div className="mb-5.5 font-display text-[19px] font-bold text-ink">
                    Criar uma Conta
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                    <TextField
                        label="Nome da Loja"
                        name="storeName"
                        type="storeName"
                        placeholder="Nome da Loja"
                        autoComplete="storeName"
                        error={state?.fieldErrors?.storeName}
                    />
                    <TextField
                        label="Nome"
                        name="name"
                        type="name"
                        placeholder="Seu nome completo"
                        autoComplete="name"
                        error={state?.fieldErrors?.name}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="your@example.com"
                        autoComplete="email"
                        error={state?.fieldErrors?.email}
                    />
                    <TextField
                        label="Celular"
                        name="phone"
                        type="phone"
                        placeholder="Digite seu celular"
                        autoComplete="phone"
                        error={state?.fieldErrors?.phone}
                    />
                    <PasswordField
                        label="Senha"
                        name="password"
                        placeholder="Digite sua senha"
                        autoComplete="new-password"
                        error={state?.fieldErrors?.password}
                    />
                    <PasswordField
                        label="Confirme a Senha"
                        name="confirmPassword"
                        placeholder="Confirme sua senha"
                        autoComplete="new-password"
                        error={state?.fieldErrors?.confirmPassword}
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <SubmitButton pending={pending} className="w-auto px-8">
                        {pending ? "Cadastrando..." : "Cadastrar"}
                    </SubmitButton>
                </div>
            </form>
    )
}
