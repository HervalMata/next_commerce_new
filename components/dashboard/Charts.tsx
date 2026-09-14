"use client"

import {useId, useState} from "react";
import {Icon, type IconName} from "@/components/dashboard/Icon";

export const CHART = {
    pink: "#BE9ECC",
    green: "#2E9E6B",
    amber: "#E0912F",
    ink: "#17151F",
    blue: "#4C7DF0",
    deep: "#2E1F6B"
}

export type Series = { label: string; color: string; data: number[] }

function smoothPath(pts: { x: number; y: number }[]): string {
    if (pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i === 0 ? 0: i - 1];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2 > pts.length - 1 ? pts.length - 1 : i + 2];
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d = `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d
}

export function AreaChart(
    {
        series,
        labels,
        height = 300,
        yPrefix = "$",
    } : {
        series: Series[],
        labels: string[],
        height?: number;
        yPrefix?: string;
    }
) {
    const uid = useId().replace(/:/g, '');
    const W = 760
    const H = 300
    const padL = 34
    const padR = 10
    const padT = 12
    const padB = 26
    const plotW = W - padL - padR
    const plotH = H - padT - padB

    const max = Math.max(1, ...series.flatMap((s) => s.data))
    const yMax = Math.ceil(max)
    const n = labels.length
    const xAt = (i: number) => padL + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW)
    const yAt = (v: number) => padT + plotH - (v / yMax) * plotH

    const gridY = [0, 0.25, 0.5, 0.75, 1].map(t => padT + plotH - t * plotH)
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => Math.round(t * yMax * 10) / 10)

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            width="100%"
            height={height}
            preserveAspectRatio="none"
            role="img"
            aria-label="Gráfico de Estatisticas"
        >
            <defs>
                {series.map((s, i) => (
                    <linearGradient key={i} id={`${uid}-g${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                        <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                    </linearGradient>
                ))}
            </defs>

            {gridY.map((y, i) => (
                <line
                    key={i}
                    x1={padL}
                    y1={y}
                    x2={W - padR}
                    y2={y}
                    stroke="#F1F0F4"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                />
            ))}

            {yTicks.map((t, i) => (
                <text
                    key={i}
                    x={padL - 6}
                    y={gridY[i] + 3}
                    textAnchor="end"
                    fontFamily="var(--font-instrument), sans-serif"
                    fontSize="10"
                    fill="#A5A2AE"
                >
                    {yPrefix}
                    {t}
                </text>
            ))}

            {series.map((s, i) => {
                const pts = s.data.map((v, j) => ({ x: xAt(j), y: yAt(v) }));
                const line = smoothPath(pts)
                const area = `${line} L ${xAt(n - 1)} ${padT + plotH} L ${xAt(0)} ${padT + plotH} Z`

                return (
                    <g key={i}>
                        <path d={area} fill={`url(#${uid}-g${i})`} />
                        <path
                            d={line}
                            fill="none"
                            stroke={s.color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                )
            })}

            {labels.map((l, i) => (
                <text
                    key={i}
                    x={xAt(i)}
                    y={H - 8}
                    textAnchor="middle"
                    fontFamily="var(--font-instrument), sans-serif"
                    fontSize="10"
                    fill="#A5A2AE"
                >
                    {l}
                </text>
            ))}
        </svg>
    )
}

type RangeKey = "year" | "month" | "week"
type RangeSet = { labels: string[]; series: Series[] }

export function RangeAreaChart(
    {
        title,
        icon,
        legend,
        sets,
    }: {
        title: string;
        icon: IconName;
        legend: { label: string; color: string }[];
        sets: Record<RangeKey, RangeSet>;
    }
) {
    const [range, setRange] = useState<RangeKey>("year")
    const ranges: { k: RangeKey; l: string}[] = [
        { k: "year", l: "Este Ano" },
        { k: "month", l: "Este Mês" },
        { k: "week", l: "Esta Semana" },
    ]
    const active = sets[range]

    return (
        <div className="rounded-2xl border border-line-soft bg-surface p-[24px_26px] shadow-xs">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <span className="flex h-7.5 w-7.5 items-center justify-center rounded-md bg-pink-50 text-pink-500">
                        <Icon name={icon} size={17} strokeWidth={2} />
                    </span>
                    <span className="font-display text-[17px] font-bold text-ink">{title}</span>
                </div>
                <div className="flex gap-1 rounded-md p-1 bg-line-soft">
                    {ranges.map((r) => (
                        <button
                            key={r.k}
                            type="button"
                            onClick={() => setRange(r.k)}
                            className={`h-8 rounded-md px-3.5 font-sans text-[12px] transition ${
                                range === r.k
                                ? "bg-pink-500 font-semibold text-white"
                                    : "font-medium text-muted hover:text-ink"
                            }`}
                        >
                            {r.l}
                        </button>
                    ))}
                </div>
            </div>
            <div className="my-3.5 flex flex-wrap items-center justify-center gap-6">
                {legend.map((l) => (
                    <div key={l.label} className="flex items-center gap-2 font-sans text-[12.5px] font-medium text-ink-soft">
                        <span className="h-2.75 w-2.75 rounded-full" style={{ background: l.color }} />
                        {l.label}
                    </div>
                ))}
            </div>
            <AreaChart series={active.series} labels={active.labels} />
        </div>
    )
}

export function DonutChart(
    {
        segments,
        size = 200,
        thickness = 22,
    }: {
        segments: { label: string; value: number; color: string }[];
        size?: number;
        thickness?: number;
    }
) {
    const total = Math.max(1, segments.reduce((a, s) => a + s.value, 0))
    const r = (size - thickness) / 2
    const c = 2 * Math.PI * r
    let offset = 0

    return (
        <svg
            viewBox={`0 0 ${size} ${size}`}
            width={size}
            height={size}
            role="img"
            aria-label="Gráfico de Distribuição"
        >
            <g
                transform={`rotate(-90 ${size / 2} ${size / 2}`}
            >
                {segments.map((s, i) => {
                    const frac = s.value / total
                    const dash = frac * c
                    const el = (
                        <circle
                            key={i}
                            cx={size / 2}
                            cy={size / 2}
                            r={r}
                            fill="none"
                            stroke={s.color}
                            strokeWidth={thickness}
                            strokeDasharray={`${dash} ${c - dash}`}
                            strokeDashoffset={-offset}
                        />
                    )
                    // eslint-disable-next-line react-hooks/immutability
                    offset += dash
                    return el
                })}
            </g>
        </svg>
    )
}
