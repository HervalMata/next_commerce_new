"use client"

import {Icon} from "@/components/dashboard/Icon";
import {labelClass, PasswordField, SubmitButton, TextField} from "@/components/auth/AuthFields";
import {useActionState, useEffect} from "react";
import {FormState, updateProfile} from "@/lib/auth-actions";
import toast from "react-hot-toast";

export function CustomerProfileForm(
    {
        firstName,
        lastName,
        email,
        phone,
    }: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    }
) {
    const [state, formAction, pending] = useActionState<FormState | undefined, FormData>(
        updateProfile,
        undefined
    )

    useEffect(() => {
        if (state?.error) toast.error(state.error)
        else if (state && !state.fieldErrors && !state.error) toast.success("Perfil Atualizado")
    }, [state])

    return (
        <form action={formAction} noValidate>
            <div className="mb-8 flex flex-col items-center">
                <div className="relativer">
                    <div className="flex h-30 w-30 items-center justify-center rounded-full border border-b-pink-100
                               bg-[linear-gradient(135deg,var(--color-pink-100),var(--color-pink-50))] text-pink-400">
                        <Icon name="user" size={16} strokeWidth={1.6} />
                    </div>
                    <span className="absolute bottom-1 right-1 flex h-8.5 w-8.5 items-center justify-center rounded-full
                                    border-[3px] border-surface bg-pink-500 text-white">
                        <Icon name="camera" size={16} strokeWidth={2} />
                    </span>
                </div>
                <div className="mt-4 font-display text-[18px] font-bold text-ink">
                    {[firstName, lastName].filter(Boolean).join(" ") || "Seu Perfil"}
                </div>
            </div>

            <div className="mx-auto grid max-w-210 grid-cols-1 gap-x-6 gap-y-5.5 sm:grid-cols-2">
                <TextField
                    label="Primeiro Nome"
                    name="firstName"
                    defaultValue={firstName}
                    error={state?.fieldErrors?.firstName}
                />
                <TextField
                    label="Último Nome"
                    name="lastName"
                    defaultValue={lastName}
                    error={state?.fieldErrors?.lastName}
                />
                <TextField
                    label="Celular"
                    name="phone"
                    defaultValue={phone}
                    placeholder="Adicione um celular"
                    error={state?.fieldErrors?.phone}
                />
                <div>
                    <label className={labelClass}>Email</label>
                    <input
                        value={email}
                        disabled
                        className="h-12.5 w-full cursor-not-allowed rounded-md border border-line bg-field px-3.75
                                   font-sans text-[14px] text-muted outline-none"
                    />
                </div>
                <PasswordField
                    label="Nova Senha"
                    name="newPassword"
                    placeholder="Minimo de 8 Caracteres"
                    autoComplete="new-password"
                    error={state?.fieldErrors?.newPassword}
                />
                <PasswordField
                    label="Senha Atual"
                    name="oldPassword"
                    placeholder="Minimo de 8 Caracteres"
                    autoComplete="old-password"
                    error={state?.fieldErrors?.oldPassword}
                />
            </div>

            <div className="mx-auto mt-8 flex max-w-210 justify-end">
                <SubmitButton pending={pending} className="w-auto px-8">
                    {pending ? "Atualizando..." : "Atualizar"}
                </SubmitButton>
            </div>
        </form>
    )
}
