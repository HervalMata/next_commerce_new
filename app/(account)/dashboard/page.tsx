import Link from "next/link";
import {Icon, IconName} from "@/components/dashboard/Icon";
import {StateProvider, StateTabs, StateView} from "@/components/dashboard/PreviewPanel";
import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import {StoreFooter, StoreHeader} from "@/components/storefront/StoreFrontChrome";
import { AccountSidebar } from "@/components/dashboard/AccountSidebar";
import {CustomerProfileForm} from "@/components/dashboard/CustomerProfileForm";

const helpCards: { title: string; sub: string; icon: IconName }[] = [
    { title: "Sobre a Loja", sub: "Saiba mais sobre nossa empresa", icon: "building" },
    { title: "Contate-nos", sub: "Nós podemos te ajudar?", icon: "chat" },
    { title: "FAQ", sub: "Tire suas duvidas", icon: "help" },
    { title: "Blog", sub: "Check nossos ultimos posts", icon: "blog" },
]

export default async function CustomerDashboardPage() {
    //const session = await auth()
    // const user = session!.user ?? ""
    const user = { id: "1", name: "admin", email: "admin@crislacos.com", phone: "5521999999999" }
    const record = user.id
        ? await prisma.user.findUnique({ where: { id: user.id }, select: { name: true, email: true, phone: true } })
        : null
    const fullName = record?.name ?? user.name ?? ""
    const parts = fullName.trim().split(/\s+/)
    const firstName = parts[0] ?? ""
    const lasstName = parts.slice(1).join(" ")
    const email = record?.email ?? user.email ?? ""
    const phone = record?.phone ?? ""


    const loading = (
        <>
            <div className="my-8 flex flex-col items-center">
                <div className="h-30 w-30 animate-pulse rounded-full bg-line-soft" />
                <div className="mt-4 h-4 w-30 animate-pulse rounded bg-line-soft" />
            </div>
            <div className="mx-auto grid max-w-210 grid-cols-1 gap-6 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i}>
                        <div className="mb-2.5 h-3 w-2/5 animate-pulse rounded bg-line-soft" />
                        <div className="h-12.5 animate-pulse rounded-md bg-line-soft" />
                    </div>
                ))}
            </div>
        </>
    )

    return (
        <div className="flex min-h-screen flex-col bg-bg">
            <StoreHeader name={fullName} />
            <div className="mx-auto flex w-full max-w-[1600px] items-center gap-2 px-6 pt-5 font-sans text-[13px]
                             text-muted-soft lg:px-10">
                <Link href="/" className="text-muted">Home</Link>
                <Icon name="chevronRight" size={14} strokeWidth={2} className="text-[#C6C4CE]" />
                <span className="font-semibold text-ink">Meu Dashboard</span>
            </div>

            <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-start gap-6 px-6 pt-5
                           lg:grid-cols-[300px_1fr] lg:px-10">
                <AccountSidebar name={fullName || "Sua conta"} email={email} />
                <div className="min-h-160 rounded-2xl border border-line-soft bg-surface p-6 shadow-xs sm:p-[32px_36px_40px]">
                    <StateProvider>
                        <div className="mb-2 flex items-center justify-between">
                            <div>
                                <h1 className="font-display text-[22px] font-bold tracking-[-0.01em] text-ink">
                                    Informações do Perfil
                                </h1>
                                <div className="mt-3 h-0.75 w-11 rounded-sm bg-pink-500" />
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="hidden font-sans text-[12px] text-muted-soft sm:inline">
                                    Preview State
                                </span>
                                <StateTabs />
                            </div>
                        </div>

                        <StateView
                            loading={loading}
                            empty={{
                                title: "Perfil não está completo ainda",
                                text: "Complete seu perfil então vendedores poderão enviar para você ofertas personalizadas",
                                actionLabel: "Complete Perfil"
                            }}
                            error={{
                                title: "Não foi possivel carregar o perfil",
                                text: "Algo aconteceu errado enquanto os dados do seu perfil estavam sendo carregados",
                            }}
                        >
                            <div className="pt-5">
                                <CustomerProfileForm firstName={firstName} lastName={lasstName} email={email} phone={phone} />
                            </div>
                        </StateView>
                    </StateProvider>
                </div>
            </main>

            <section className="mx-auto w-full max-w-[1600px] px-6 pt-14 lg:px-10">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {helpCards.map((h) => (
                        <Link
                            key={h.title}
                            href="/"
                            className="flex flex-col items-center gap-3.5 rounded-2xl border border-line-soft
                               bg-surface p-[32px_24px] text-center shadow-xs transition-[box-shadow,transform]
                               duration-200 hover:-translate-y-0.75 hover:shadow-md"
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-50
                                              text-pink-500">
                                <Icon name={h.icon} size={24} strokeWidth={1.9} />
                            </span>
                            <div>
                                <div className="font-display text-[16px] font-bold leading-[1.1] text-ink">{h.title}</div>
                                <div className="mt-1.5 font-sans text-[13px] text-muted">{h.sub}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <StoreFooter />
        </div>
    )
}
