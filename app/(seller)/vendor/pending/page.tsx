import Link from "next/link";
import {SignOutButton} from "@/components/auth/SignOutButton";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

export default async function VendorPendingPage() {
    //const session = await auth()
    // const user = session!.user ?? ""
    const user = { id: "1", name: "vendor", email: "admin@crislacos.com", vendorStatus: "PENDING" }

    if (user.vendorStatus === "APPROVED") {
        redirect("/vendor/dashboard")
    }

    const suspended = user.vendorStatus == "SUSPENDED"

    return (
        <div className="flex min-h-screen flex-col bg-bg-dash">
            <header className="border-b border-line-soft bg-surface">
                <div className="mx-auto flex h-16 max-w-310 items-center gap-4 px-6">
                    <Link href="/" className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-ink">
                        Cris <span className="text-pink-500">Laços</span>
                    </Link>
                    <div className="ml-auto">
                        <SignOutButton redirectTo="/vendor/login" />
                    </div>
                </div>
            </header>

            <main className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="w-full max-w-60 rounded-2xl border border-line-soft bg-surface p-8 text-center
                               shadow-xs sm:p-11">
                    <span className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl ${
                        suspended ? "bg-error-bg text-error" : "bg-warning-bg text-warning"
                    }`}>
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </span>

                    <h1 className="font-display text-[26px] font-extrabold tracking-[-0.01em] text-ink">
                        {suspended ? "Loja Suspensa" : "Sua loja está em revisão"}
                    </h1>
                    <p className="mx-auto mt-3 max-w-105 font-sans text-[14px] leading-[1.6] text-muted">
                        {suspended
                            ? "Esta conta de Vendedor foi suspensa. Por favor contate o suporte da Cris Laços para resolver o problema e restaurar o acesso"
                            : "Obrigado pelo cadstro, " + (user.name?.split(" ")[0] ?? "Vendedor") +
                            ". Um Administrador está revisando sua conta. Você terá acesso ao dashboard de vendedor o mais rápido possivel após a aprovação."
                        }
                    </p>

                    <div className="mt-7 flex items-center justify-center gap-3">
                        <Link className="flex h-11 items-center rounded-md border border-line bg-surface px-5
                                font-sans text-[13px] font-semibold text-ink-soft transition-colors hover:bg-field"
                            href="/">
                            Voltar para a Loja
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
