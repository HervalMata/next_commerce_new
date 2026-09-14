import {auth} from "@/auth";
import { Icon, type IconName } from "@/components/dashboard/Icon";
import {Card, ProductTitle, RatedRow, SectionHead, StatusStat, type Tone, toneChip} from "@/components/dashboard/cards";
import {CHART, DonutChart, RangeAreaChart} from "@/components/dashboard/Charts";
import {ReactNode} from "react";
import {SellerShell} from "@/components/dashboard/SellerShell";
import {StateProvider, StateTabs, StateView} from "@/components/dashboard/PreviewPanel";

const bizCards: { label: string; value: number; icon: IconName; tone: Tone }[] = [
    { label: "Total de Ordens", value: 248, icon: "order", tone: "pink" },
    { label: "Total de Lojas", value: 10, icon: "store", tone: "info" },
    { label: "Total de Produtos", value: 39, icon: "product", tone: "success" },
    { label: "Total de Compradores", value: 21, icon: "customer", tone: "warning" },
]

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

const walletLeft = [
    { icon: "dollar" as IconName, v: "R$ 12927,52", L: "Ganhos de Comissão" },
    { icon: "tax" as IconName, v: "R$ 5240,00", L: "Total de Taxas Recebidas" },
]

const walletRight = [
    { icon: "truck" as IconName, v: "R$ 1660,00", L: "Ganhos de Mudanças de Entrega" },
    { icon: "clock" as IconName, v: "R$ 7687,00", L: "Total Pendente" },
]

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"]

const orderSets = {
    year: {
        labels: months,
        series: [
            { label: "Depósito", color: CHART.pink, data: [1.2, 1.8, 1.4, 2.6, 2.1, 3.4, 2.9, 3.8, 3.2, 4.4, 3.9, 4.8] },
            { label: "Vendas", color: CHART.green, data: [0.8, 1.2, 1.0, 1.8, 1.5, 2.4, 2.1, 2.8, 2.4, 3.2, 2.9, 3.6] },
        ]
    },
    month: {
        labels: ["S1", "S2", "S3", "S4"],
        series: [
            { label: "Depósito", color: CHART.pink, data: [2.1, 3.2, 2.8, 4.1] },
            { label: "Vendas", color: CHART.green, data: [1.4, 2.2, 1.9, 2.8] },
        ]
    },
    week: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
        series: [
            { label: "Depósito", color: CHART.pink, data: [0.6, 0.9, 0.7, 1.2, 1.0, 1.5, 1.3] },
            { label: "Vendas", color: CHART.green, data: [0.4, 0.6, 0.5, 0.9, 0.7, 1.1, 0.9] },
        ]
    }
}

const earnSets = {
    year: {
        labels: months,
        series: [
            { label: "Depósito", color: CHART.pink, data: [1.4, 2.0, 1.6, 2.8, 2.3, 3.6, 3.1, 4.0, 3.4, 4.6, 4.1, 5.0] },
            { label: "Vendas", color: CHART.green, data: [1.0, 1.4, 1.2, 2.0, 1.7, 2.6, 2.3, 3.0, 2.6, 3.4, 3.1, 3.8] },
            { label: "Comissão", color: CHART.amber, data: [0.3, 0.4, 0.35, 0.55, 0.45, 0.7, 0.6, 0.8, 0.7, 0.9, 0.82, 1.0] },
        ]
    },
    month: {
        labels: ["S1", "S2", "S3", "S4"],
        series: [
            { label: "Depósito", color: CHART.pink, data: [2.4, 3.5, 3.0, 4.4] },
            { label: "Vendas", color: CHART.green, data: [1.6, 2.4, 2.1, 3.0] },
            { label: "Comissão", color: CHART.amber, data: [0.4, 0.6, 0.5, 0.75] },
        ]
    },
    week: {
        labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
        series: [
            { label: "Depósito", color: CHART.pink, data: [0.7, 1.0, 0.8, 1.3, 1.1, 1.6, 1.4] },
            { label: "Vendas", color: CHART.green, data: [0.5, 0.7, 0.6, 1.0, 0.8, 1.2, 1.0] },
            { label: "Comissão", color: CHART.amber, data: [0.1, 0.15, 0.12, 0.2, 0.16, 0.24, 0.2] },
        ]
    }
}

const userDonut = [
    { label: "Total de Compradores", value: 7, color: CHART.blue },
    { label: "Total de Vendedores", value: 10, color: CHART.amber },
    { label: "Total de Entregadores", value: 4, color: CHART.deep },
]

const topCustomers = [
    { name: "Robert Downey", email: "r****@**mer.com", orders: 140 },
    { name: "David Jack", email: "t****@**mer.com", orders: 17 },
    { name: "Chris Evans", email: "c****@**mer.com", orders: 7 },
    { name: "Anthony Markie", email: "t****@**mer.com", orders: 3 },
]

const deliveryMen = [
    { name: "Will Smith", rating: "4.50", delivered: 10 },
    { name: "Marcus Reid", rating: "4.10", delivered: 6 }
]

const popularStores = [
    { name: "Book Store", likes: 3 },
    { name: "FootFinds", likes: 1 }
]

const topStores = [
    { name: "Bicycle Shop", sales: "R$ 12000,20" },
    { name: "Book store", sales: "R$ 10081,50" },
    { name: "Hanover Electronics", sales: "R$ 9590,01" },
    { name: "Liceria & co.", sales: "R$ 400,00" }
]

const inhouseRated = [
    { title: "4 French Door Refrigerator", rating: 5, reviews: 2 },
    { title: "Straps Plaid Patchwork Dress", rating:5, reviews: 1 },
    { title: "T900 Smart Watch", rating: 4, reviews: 1 },
]

const inhouseTop = [
    { title: "4 French Door Refrigerator", price: "R$ 5400,00", sold: 12 },
    { title: "Straps Plaid Patchwork Dress", price: "R$ 3150,00", sold: 7 },
    { title: "Bohemiantee Shirt Tops", price: "R$ 3430,00", sold: 7 },
    { title: "T900 Smart Watch", price: "R$ 31500,00", sold: 7 },
]

const vendorRated = [
    { title: "Copper Alloy Inlaid Zircon Ring", seller: "Golden Jewellery", rating: 5, reviews: 3 },
    { title: "iPhone 14 Pro Max", seller: "Hanover Electronics", rating:5, reviews: 1 },
    { title: "Leather Single Shoes", seller: "FootFinds", rating: 5, reviews: 1 },
]

const vendorTop = [
    { title: "iPhone 14 Pro Max", seller: "Hanover Electronics", price: "R$ 4950,00", sold: 11 },
    { title: "Vimly Women Blazer Suit", seller: "Marchetti", price: "R$ 22500,00", sold: 5 },
    { title: "Copper Alloy Inlaid Zircon Ring", seller: "Golden Jewellery", price: "R$ 20000,00", sold: 4 },
    { title: "Women Beautiful White Sneakers", seller: "FootFinds", price: "R$ 1350,00", sold: 3 },
]

function StoreRow(
    {
        name,
        meta,
        icon,
    }: {
        name: string;
        meta: ReactNode;
        icon: IconName;
    }
) {
    return (
        <a href="#"
            className="flex items-center gap-3 rounded-xl border border-line-soft p-3.5 hover:bg-bg-subtle"
        >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-md
                            bg-[linear-gradient(135deg,var(--color-pink-100),var(--color-pink-50))] text-pink-500">
                <Icon name={icon} size={22} strokeWidth={1.7} />
            </span>
            <div className="min-w-0">
                <div className="font-sans text-[13.5px] font-semibold leading-[1.2] text-ink">{name}</div>
                <div className="mt-1.5">{meta}</div>
            </div>
        </a>
    )
}

export default async function AdminDashboardPage() {
    const session = await auth()
    const user = session!.user

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
                <div className="mb-3.5 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
                    {bizCards.map((c) => (
                        <div className="flex items-center justify-between gap-3 rounded-lg border border-line-soft
                             bg-bg-subtle p-4.5 "
                            key={c.label}>
                            <div>
                                <div className="font-sans text-[12.5px] text-muted">{c.label}</div>
                                <div className="mt-3 font-display text-[26px] font-extrabold text-ink">{c.value}</div>
                            </div>
                            <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-md ${
                                              toneChip(c.tone)}`}>
                                <Icon name={c.icon} size={22} strokeWidth={1.8} />
                            </span>
                        </div>
                    ))}
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
                    <span className="font-display text-[17px] font-bold text-ink">Admin Wallet</span>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr_1fr]">
                    <div className="flex flex-col items-center justify-center rounded-xl border border-pink-100 gap-2
                               bg-[linear-gradient(150deg,var(--color-pink-50),#fbfaff)] p-5 text-center">
                        <span className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-xl bg-surface
                                       text-pink-500 shadow-sm">
                            <Icon name="bars" size={26} strokeWidth={1.8} />
                        </span>
                        <div className="font-display text-[24px] font-extrabold">R$ 27514,52</div>
                        <div className="mt-2 font-sans text-[13px] text-muted">Total Admin Ganhos</div>
                    </div>
                    {[walletLeft, walletRight].map((col, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            {col.map((w) => (
                                <div
                                    key={w.L}
                                    className="flex flex-1 items-center justify-between gap-3 rounded-xl border
                                      border-line-soft bg-bg-subtle p-5"
                                >
                                    <div>
                                        <div className="font-display text-[21px] font-extrabold text-ink">{w.v}</div>
                                        <div className="mt-1.5 font-sans text-[12.5px] text-muted">{w.L}</div>
                                    </div>
                                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-pink-50
                                       text-pink-500">
                                        <Icon name={w.icon} size={22} strokeWidth={1.7} />
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </Card>

            <div className="grid grid-cols-1 items-start gap-5.5 lg:grid-cols-[1fr_380px]">
                <RangeAreaChart
                    title="Estatisticas das Ordens"
                    icon="trendUp"
                    legend={[
                        { label: "Depósito", color: CHART.pink },
                        { label: "Vendas", color: CHART.green },
                    ]}
                    sets={orderSets}
                />
                <Card className="p-[24px_26px]">
                    <div className="mb-5 font-display text-[17px] font-bold text-ink">Resumo do Usuário</div>
                    <div className="mb-5 flex justify-center">
                        <DonutChart segments={userDonut} size={210} thickness={24} />
                    </div>
                    <div className="flex flex-col gap-3">
                        {userDonut.map((u) => (
                            <div
                                key={u.label}
                                className="flex items-center gap-2.5 font-sans text-[13px] font-medium text-ink-soft"
                            >
                                <span className="h-2.5 w-2.5 rounded-full" style={{ background: u.color }} />
                                {u.label} ({u.value})
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <RangeAreaChart
                title="Estatisticas Dos Ganhos"
                icon="bars"
                legend={[
                    { label: "Depósito", color: CHART.pink },
                    { label: "Vendas", color: CHART.green },
                    { label: "Comissão", color: CHART.amber },
                ]}
                sets={earnSets}
            />

            <div className="font-display text-[18px] font-bold text-ink">Usuários</div>
            <div className="grid grid-cols-1 gap-5.5 lg:grid-cols-2">
                <Card>
                    <SectionHead icon="users" title="Maiores Compradores" viewAll />
                    <div className="flex flex-col gap-2.5">
                        {topCustomers.map((c) => (
                            <div className="flex items-center gap-3.5 rounded-xl border border-line-soft
                                          p-3 hover:bg-bg-subtle"
                                key={c.name}>
                                <div className="flex h-11 w-11 items-center justify-center rounded-full text-pink-500
                                          bg-[linear-gradient(135deg,var(--color-pink-100),var(--color-pink-50))]">
                                    <Icon name="user" size={22} strokeWidth={1.8} />
                                </div>
                                <div className="min-w-0">
                                    <div className="font-sans text-[14px] font-semibold text-ink">
                                        {c.name}
                                    </div>
                                    <div className="mt-1.5 font-sans text-[11.5px] text-muted-soft">{c.email}</div>
                                </div>
                                <span className="whitespace-nowrap rounded-full bg-pink-500 px-3 py-1.5 font-sans
                                                text-[11px] font-semibold text-accent-fgt">
                                    Ordens: {c.orders}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <SectionHead icon="truck" tone="error" title="Maiores Entregadores" viewAll />
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {deliveryMen.map((d) => (
                            <div key={d.name} className="rounded-xl border border-line-soft p-5 text-center">
                                <div className="mx-auto mb-3 flex h-15 w-15 items-center justify-center rounded-full
                               bg-[linear-gradient(135deg,var(--color-pink-100),var(--color-pink-50))] text-pink-400">
                                    <Icon name="user" size={28} strokeWidth={1.7} />
                                </div>
                                {/*<div>*/}
                                    <div className="font-display text-[14px] font-bold text-ink">{d.name}</div>
                                    <div className="mt-2.5 flex items-center justify-center gap-1.5 font-sans
                                                   text-[12px] text-muted">
                                        Avaliação: <span className="font-semibold text-ink">{d.rating}</span>
                                        <Icon name="star" size={12} className="text-muted" />
                                    </div>
                                {/*</div>*/}
                                <div className="mt-2 font-sans text-[12px] text-muted">
                                    Ordens Entregues: <span className="font-semibold text-ink">{d.delivered}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="font-display text-[18px] font-bold text-ink">Lojas</div>
            <div className="grid grid-cols-1 gap-5.5 lg:grid-cols-2">
                <Card>
                    <SectionHead icon="heart" tone="error" title="Lojas Mais Populares" viewAll filled />
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        {popularStores.map((s) => (
                            <StoreRow
                                key={s.name}
                                name={s.name}
                                meta={
                                    <span className="flex items-center gap-1 font-sans text-[12px] text-muted">
                                        <Icon name="heart" size={12} className="text-danger" />
                                        {s.likes}
                                    </span>
                                }
                                icon="store"
                            />
                        ))}
                    </div>
                </Card>
                <Card>
                    <SectionHead icon="clockBig" title="Maiores Vendedores" viewAll />
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                        {topStores.map((s) => (
                            <StoreRow
                                key={s.name}
                                name={s.name}
                                meta={
                                    <span className="flex items-center gap-1.5 font-display text-[12.5px] font-bold
                                             text-pink-500">
                                        <Icon name="cart" size={13} strokeWidth={2} />
                                        {s.sales}
                                    </span>
                                }
                                icon="store"
                            />
                        ))}
                    </div>
                </Card>
            </div>

            <div className="font-display text-[18px] font-bold text-ink">Produtos em Depósito</div>
            <div className="grid grid-cols-1 gap-5.5 lg:grid-cols-2">
                <Card>
                    <SectionHead icon="star" tone="amber" title="Produtos Mais Ranqueados" viewAll filled />
                    <div className="flex flex-col gap-3">
                        {inhouseRated.map((p) => (
                            <RatedRow
                                key={p.title}
                                title={p.title}
                                subtitle="Vendas Por Loja"
                                rating={p.rating}
                                reviews={p.reviews}
                            />
                        ))}
                    </div>
                </Card>
                <Card>
                    <SectionHead icon="dollar" title="Produtos Mais Vendidos" viewAll />
                    <div className="grid grid-cols-2 gap-3.5">
                        {inhouseTop.map((p) => (
                            <ProductTitle
                                key={p.title}
                                title={p.title}
                                price={p.price}
                                sold={p.sold}
                            />
                        ))}
                    </div>
                </Card>
            </div>

            <div className="font-display text-[18px] font-bold text-ink">Produtos em Venda</div>
            <div className="grid grid-cols-1 gap-5.5 lg:grid-cols-2">
                <Card>
                    <SectionHead icon="star" tone="amber" title="Produtos Mais Ranqueados" viewAll filled />
                    <div className="flex flex-col gap-3">
                        {vendorRated.map((v) => (
                            <RatedRow
                                key={v.title}
                                title={v.title}
                                subtitle={`Vendas Por ${v.seller}`}
                                rating={v.rating}
                                reviews={v.reviews}
                            />
                        ))}
                    </div>
                </Card>
                <Card>
                    <SectionHead icon="dollar" title="Produtos Mais Vendidos" viewAll />
                    <div className="grid grid-cols-2 gap-3.5">
                        {vendorTop.map((v) => (
                            <ProductTitle
                                key={v.title}
                                title={v.title}
                                seller={v.seller}
                                price={v.price}
                                sold={v.sold}
                            />
                        ))}
                    </div>
                </Card>
            </div>

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
            variant="admin"
            userName={user.name ?? "Admin"}
            userEmail={user.email ?? ""}
            signOutTo="/admin/login"
            setupPercent={38}
            showSearch
            notifyCount={12}
        >
            <StateProvider>
                <div className="mb-5.5 flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.01em] text-ink">
                            Bemvindo {user.name ?? "Admin"}
                        </h1>
                        <p className="mt-3 font-sans text-[14px] text-muted">
                            Monitore seus negócios com Ánalises e Estatisticas
                        </p>
                    </div>
                    <StateTabs
                        trackClass="bg-[#EDECF1]"
                    />
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
