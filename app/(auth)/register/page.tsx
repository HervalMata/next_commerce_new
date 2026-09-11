import {AuthFooter, AuthTopbar} from "@/components/auth/AuthChrome";
import {BrandPanel} from "@/components/auth/BrandPanel";
import {CustomerLoginForm} from "@/components/auth/CustomerLoginForm";
import type {Metadata} from "next";
import CustomerRegisterForm from "@/components/auth/CustomerRegisterForm";

export const metadata: Metadata = { title: "Register in Cris Laços" };

export default function CustomerRegisterPage() {
    return (
        <div className="flex min-h-screen flex-col bg-bg">
            <AuthTopbar />
            <main className="flex-1">
                <div className="mx-auto grid max-w-310 grid-cols-1 items-stretch gap-10 px-8 py-14
                                  lg:grid-cols-[1.05fr_0.95fr]">
                    <BrandPanel />
                    <div className="flex flex-col justify-center rounded-2xl border border-line-soft bg-surface
                                      p-8 shadow-xs sm:p-[44px_46px]">
                        <h1 className="font-display text-[28px] font-extrabold tracking-[-0.01em] text-ink">
                            Criar uma conta
                        </h1>
                        <p className="mb-7.5 mt-3 font-sans text-[14px] leading-normal text-muted">
                            Se junte a Cris Laços
                        </p>
                        <CustomerRegisterForm />
                    </div>
                </div>
            </main>
            <AuthFooter />
        </div>
    )
}
