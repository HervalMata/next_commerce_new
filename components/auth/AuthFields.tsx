"use client"

import {ReactNode, useState} from "react";

function EyeIcon({ size = 18 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}

function EyeOffIcon({ size = 18 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12
                     9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    )
}

export const labelClass = "block font-sans text-[13px] font-semibold text-link-soft mb-[9px]";

export const inputBase =
    "w-full h-[50px] rounded-md border border-line bg-bg-subtle px-[16px] font-sans text-[14px] " +
    "text-ink outline-none transition-[border-color,box-shadow,background-color] duration-200 focus:border-pink-500" +
    "focus:bg-surface focus:shadow-[0_0_0_3px_var(--color-pink-100)]";

export function FieldError({message}: {message?: string}) {
    if (!message) return null;
    return (
        <p className="mt-2 font-sans text-[12px] text-error" role="alert">
            {message}
        </p>
    )
}

export function TextField(
    {
        label, name, type = "text", placeholder, autoComplete, required, error, defaultValue,
    }: {
        label: string;
        name: string;
        type?: string;
        placeholder?: string;
        autoComplete?: string;
        required?: boolean;
        error?: string;
        defaultValue?: string;
    }
) {
    return (
        <div>
            <label htmlFor={name} className={labelClass}>
                {label}
                {required && <span className="text-danger"> *</span>}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                defaultValue={defaultValue}
                aria-invalid={!!error}
                className={`${inputBase} ${error ? "border-error focus: shadow-[0_0_0_0_3px_var(--color-error-bg)]}" 
                              : ""}`}
            />

            <FieldError message={error} />
        </div>
    )
}

export function PasswordField(
    {
        label = "Senha",
        name = "password",
        placeholder = "Digite sua senha",
        autoComplete = "Senha Atual",
        required,
        error,
        hint,
    }: {
        label?: string;
        name?: string;
        placeholder?: string;
        autoComplete?: string;
        required?: boolean;
        error?: string;
        hint?: ReactNode;
    }
) {
    const [show, setShow] = useState(false)

    return (
        <div>
            <div className="mb-2.25 flex items-center justify-between">
                <label htmlFor={name} className="font-sans text-[13px] font-semibold text-link-soft">
                    {label}
                    {required && <span className="text-danger"> *</span>}
                </label>
                {hint}
            </div>
            <div className={`flex h-12.5 items-center overflow-hidden rounded-md border 
                             transition-[border-color,box-shadow,background-color] duration-200 
                          focus-within:border-pink-500 focus-within:bg-surface 
                          focus-within:shadow-[0_0_0_0_0_3px_var(--color-pink-100)] 
                          ${error ? "border-error focus-within:shadow-[0_0_0_3px_var(--color-error-bg)]" 
                           : "border-line"}`}>
                <input
                    id={name}
                    name={name}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={!!error}
                    className="min-w-0 flex-1 border-none bg-transparent px-3.75 font-sans text-[14px] outline-none"
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Esconder Senha" : "Mostrar Senha"}
                    className="flex h-full items-center px-3.5 text-muted-soft transition-colors hover:text-muted">
                    {show ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
                </button>

            </div>
            <FieldError message={error} />
        </div>
    )
}

export function SubmitButton(
    {
        children,
        pending,
        className = "",
    }: {
        children: ReactNode;
        pending?: boolean;
        className?: string;
    }
) {
    return (
        <button
        type="submit"
        disabled={pending}
        className={`flex h-14.25 w-full items-center justify-center gap-2 rounded-md bg-pink-500 font-display 
                    text-[14px] font-bold text-white transition-colors hover:bg-pink-600 disabled:cursor-not-allowed
                    disabled:opacity-70 ${className}`}>
            {pending && (
                <span className="h-4.5 w-4.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {children}
        </button>
    )
}
