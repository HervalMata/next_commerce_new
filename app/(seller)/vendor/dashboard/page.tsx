import {Icon, IconName} from "@/components/dashboard/Icon";
import {
    Card,
    SectionHead,
    StatusStat, Thumb,
    Tone,
    WalletStat
} from "@/components/dashboard/cards";
import {CHART, RangeAreaChart} from "@/components/dashboard/Charts";
import {redirect} from "next/navigation";
import {StateProvider, StateTabs, StateView} from "@/components/dashboard/PreviewPanel";
import {SellerShell} from "@/components/dashboard/SellerShell";

const statusCards: { label: string; value: number; icon: IconName; tone: Tone, numClass?: string }[] = [
    { label: "Pendente", value: 3, icon: "pending", tone: "info" },
    { label: "Confirmado", value: 4, icon: "confirmed", tone: "success", numClass: "text-success" },
    { label: "Embalando", value: 1, icon: "packaging", tone: "warning" },
    { label: "Saiu Para Entrega", value: 2, icon: "outfor", tone: "pink" },
    { label: "Entregue", value: 11, icon: "delivered", tone: "success", numClass: "text-success" },
    { label: "Cancelado", value: 1, icon: "canceled", tone: "error" },
    { label: "Retornado", value: 1, icon: "returned", tone: "info" },
    { label: "Falha Na Entrega", value: 2, icon: "failed", tone: "error", numClass: "text-danger" },
]

const earningSets = {
    year: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"],
        series: [
            { label: "Vendas", color: CHART.green, data: [1.0, 1.4, 1.2, 2.0, 1.7, 2.6, 2.3, 3.0, 2.6, 3.4, 3.1, 3.8] },
            { label: "Comissão", color: CHART.amber, data: [0.3, 0.4, 0.35, 0.55, 0.45, 0.7, 0.6, 0.8, 0.7, 0.9, 0.82, 1.0] },
        ]
    },
    month: {
        labels: ["S1", "S2", "S3", "S4"],
        series: [
            { label: "Vendas", color: CHART.green, data: [1.6, 2.4, 2.1, 3.0] },
            { label: "Comissão", color: CHART.amber, data: [0.4, 0.6, 0.5, 0.75] },
        ]
    },
    week: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
        series: [
            { label: "Vendas", color: CHART.green, data: [0.5, 0.7, 0.6, 1.0, 0.8, 1.2, 1.0] },
            { label: "Comissão", color: CHART.amber, data: [0.1, 0.15, 0.12, 0.2, 0.16, 0.24, 0.2] },
        ]
    }
}

const topProducts = [
    { title: "Vimly Women Blazer Suit", sales: "R$ 22500,00", sold: 5 },
    { title: "Leather Ladies Bag", sales: "R$ 17970,00", sold: 3 },
    { title: "Ladies Bag", sales: "R$ 1969,00", sold: 3 },
    { title: "Ugly Love: A Novel", sales: "R$ 930,00", sold: 1 },
    { title: "Hydration Pack", sales: "R$ 50,00", sold: 1 },
]

const deliveryMen = [
    { name: "Will Smith", rating: "4.90", delivered: 2 },
    { name: "Marcus Reid", rating: "4.70", delivered: 1 }
]

export default async function VendorDashboardPage() {
    //const session = await auth()
    // const user = session!.user ?? ""
    const user = { id: "1", name: "Vendedor", email: "vendedor@crislacos.com", vendorStatus: "PENDING" }

    if (user.vendorStatus !== "APPROVED") {
        redirect("/vendor/pending")
    }

    const firstName = user.name?.split(" ")[0] ?? "Vendedor"

    const defaultView = (
        <div className="flex flex-col gap-5.5">
            <Card className="p-[24px_26px]">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-pink-50 text-pink-500">
                            <Icon name="trendUp" size={17} strokeWidth={2} />
                        </span>
                        <span className="font-display text-[17px] font-bold text-ink">Resultados Analiticos</span>
                    </div>
                    <div className="flex h-10 items-center gap-2 rounded-md border border-line px-3.5 font-sans
                                  text-[13px] text-ink-soft">
                        Estatisticas Anuais
                        <Icon name="chevronDown" size={14} strokeWidth={2} className="text-muted" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
                    {statusCards.map((c) => (
                        <StatusStat key={c.label} {...c} chipSize={34} />
                    ))}
                </div>
            </Card>

            <Card className="p-[24px_26px]">
                <div className="mb-5 flex items-center gap-2.5">
                    <span className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-pink-50 text-pink-500">
                        <Icon name="wallet" size={17} strokeWidth={2} />
                    </span>
                    <span className="font-display text-[17px] font-bold text-ink">Vendedor Wallet</span>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr_1fr]">
                    <div className="flex flex-col items-center justify-center rounded-xl border border-pink-100 gap-2
                               bg-[linear-gradient(150deg,var(--color-pink-50),#fbfaff)] p-5 text-center">
                        <span className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-xl bg-surface
                                       text-pink-500 shadow-sm">
                            <Icon name="card" size={26} strokeWidth={1.8} />
                        </span>
                        <div className="font-display text-[24px] font-extrabold">R$ 27514,52</div>
                        <div className="mt-2 font-sans text-[13px] text-muted">Total Admin Ganhos</div>
                        <button
                            type="button"
                            className="h-11 w-full rounded-md bg-pink-500 font-display text-[13px] font-bold
                            text-white transition-colors hover:bg-pink-600"
                        >
                            Recebimentos
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <WalletStat icon="clock" v1="R$ 500,00" l1="Recebimento Pendente" v2="" l2="" />
                        <WalletStat icon="coins" v1="R$ 600,00" l1="Recebimento Efetuado" v2="R$ 2534,00" l2="Taxas Totais" />
                    </div>
                    <div>
                        <WalletStat icon="dollar" v1="R$ 6401,97" l1="Comissão Total" v2="" l2="" />
                        <WalletStat icon="cash" v1="R$ 822,00" l1="Total Após Entregas" v2="R$ 25756,80" l2="Dinheiro Coletado" />
                    </div>
                </div>
            </Card>

            <RangeAreaChart
                title="Estatisticas Dos Ganhos"
                icon="bars"
                legend={[
                    { label: "Depósito", color: CHART.pink },
                    { label: "Vendas", color: CHART.green },
                    { label: "Comissão", color: CHART.amber },
                ]}
                sets={earningSets}
            />

            <div className="grid grid-cols-1 gap-5.5 lg:grid-cols-2">
                <Card>
                    <SectionHead icon="star" tone="amber" title="Maiores Compradores" viewAll filled />
                            <div className="flex items-center gap-3.5 rounded-xl border border-line-soft
                                          p-3 hover:bg-bg-subtle">
                                <Thumb className="h-14 w-14 flex-none rounded-xl" />
                                <div className="min-w-0 flex-1">
                                    <div className="font-sans text-[14px] font-semibold leading-[1.3] text-ink">
                                        Leather Ladies Bag
                                    </div>
                                    <div className="mt-1.5 font-sans text-[11px] text-pink-500">by Marchetti</div>
                                    <div className="mt-2 flex items-center gap-1.5">
                                        <Icon name="star" size={14} className="text-star" />
                                        <span className="font-display text-[12.5px] font-bold text-ink">
                                            4,5
                                        </span>
                                        <span className="font-sans text-[11px] font-semibold text-accent-fg">
                                            2 Avaliações
                                        </span>
                                    </div>
                                </div>
                            </div>
                </Card>
                <Card>
                    <SectionHead icon="dollar" title="Produtos Mais Vendidos" viewAll />
                    <div className="flex flex-col gap-3.5 sm:grid-cols-3">
                        {topProducts.map((c) => (
                            <div className="rounded-xl border border-line-soft p-3 text-center transition-colors
                                         hover:shadow-sm"
                                 key={c.title}>
                                <Thumb className="mb-2.5 aspect-square rounded-md" />
                                <div className="min-h-8 font-sans text-[12.5px] font-semibold leading-[1.3] text-ink">
                                        {c.title}
                                </div>
                                <div className="mb-1 mt-2 font-sans text-[11px] text-muted-soft">Total Vendido</div>
                                <div className="mb-2.5 font-display text-[14px] font-bold text-ink">{c.sales}</div>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500 px-3 py-1.5
                                                 font-sans text-[11px] font-semibold text-white">
                                    Vendas: {c.sold}
                                    <Icon name="cart" size={13} strokeWidth={2} />
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
                <Card>
                    <SectionHead icon="user" tone="error" title="Maiores Entregadores" viewAll />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {deliveryMen.map((d) => (
                            <div key={d.name} className="rounded-xl border border-line-soft p-[22px]] text-center">
                                <div className="mx-auto mb-3 flex h-15 w-15 items-center justify-center rounded-full
                               bg-[linear-gradient(135deg,var(--color-pink-100),var(--color-pink-50))] text-pink-400">
                                    <Icon name="user" size={28} strokeWidth={1.7} />
                                </div>
                                <div className="font-display text-[14px] font-bold text-ink">{d.name}</div>
                                <div className="mt-2.5 flex items-center justify-center gap-1.5 font-sans
                                                   text-[12px] text-muted">
                                    Avaliação: <span className="font-semibold text-ink">{d.rating}</span>
                                    <Icon name="star" size={12} className="text-muted" />
                                </div>
                                <div className="mt-2 font-sans text-[12px] text-muted">
                                    Ordens Entregues: <span className="font-semibold text-ink">{d.delivered}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
    )

    const loading = (
        <div className="flex flex-col gap-5.5">
            <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-24 animate-pulse rounded-lg bg-line-soft" />
                ))}
            </div>
            <div className="h-50 animate-pulse rounded-2xl bg-line-soft" />
            <div className="h-85 animate-pulse rounded-2xl bg-line-soft" />
        </div>
    )

    return (
        <SellerShell
            variant="vendor"
            userName={user.name ?? "Vendedor"}
            userEmail={user.email ?? ""}
            signOutTo="/vendor/login"
            setupPercent={20}
            notifyCount={1}
        >
            <StateProvider>
                <div className="mb-5.5 flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.01em] text-ink">
                            Bemvindo {user.name ?? firstName}
                        </h1>
                        <p className="mt-3 font-sans text-[14px] text-muted">
                            Monitore seus negócios com Ánalises e Estatisticas
                        </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <span className="hidden font-sans text-[12px] text-muted-soft sm:inline">Preview State</span>
                        <StateTabs
                            trackClass="bg-[#EDECF1]"
                        />
                        <button
                            type="button"
                            className="flex h-11 items-center gap-2 rounded-md bg-pink-500 font-display text-[13px]
                            font-bold text-white transition-colors hover:bg-pink-600"
                        >
                            <Icon name="box" size={17} strokeWidth={2} />
                            Produtos
                        </button>
                    </div>
                </div>
                <StateView
                    loading={loading}
                    empty={{
                        title: "Nenhuma Analise ainda",
                        text: "As lojas e ordens estão "
                    }}
                    error={{
                        title: "Não foi possivel carregar o dashboard",
                        text: "Alguma coisa está errado enquanto tentando carregar os dados. por favor tente novamente"
                    }}
                >
                    {defaultView}
                </StateView>
            </StateProvider>
        </SellerShell>
    )
}
