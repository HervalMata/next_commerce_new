"use client"

import {useActionState, useEffect} from "react";
import {FormState, login} from "@/lib/auth-actions";
import toast from "react-hot-toast";
import {PasswordField, SubmitButton, TextField} from "@/components/auth/AuthFields";

export function AdminLoginForm() {
    const [state, formAction, pending] = useActionState<FormState | undefined, FormData>(
        login, undefined
    )

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
                    placeholder="admin@crislacos.com"
                    autoComplete="email"
                    error={state?.fieldErrors?.email}
                />
            </div>
            <div className="mb-6.5">
                <PasswordField
                    label="Senha"
                    name="password"
                    placeholder="Digite sua senha"
                    autoComplete="senha"
                    error={state?.fieldErrors?.password}
                />
            </div>

            <SubmitButton pending={pending}>
                {pending ? "Entrando..." : "Entrar"}
            </SubmitButton>
        </form>
    )
}
