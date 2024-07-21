"use client"

import * as React from "react"

import { Pie, PieChart, ResponsiveContainer, Label } from "recharts"
import {
    ChartConfig,
    ChartContainer,
} from "../../../@/components/ui/chart"
import { addSpace } from "../../utils/fonctionnel";

export function Camembert(props: any) {


    const depensesFixes = parseFloat(props.dataDf);
    const loisir = parseFloat(props.dataLoisir);
    let epargne = props.total - (depensesFixes + loisir);

    if (epargne < 0) {
        epargne = 0;
    }

    const total = props.total;

    const chartData = [
        { categorie: "Dépenses fixes", objectif: 50, montant: depensesFixes, pourcentage: (depensesFixes / total) * 100, fill: "var(--color-depensesFixes)" },
        { categorie: "Loisir", objectif: 30, montant: loisir, pourcentage: (loisir / total) * 100, fill: "var(--color-loisir)" },
        { categorie: "Épargne", objectif: 20, montant: epargne, pourcentage: (epargne / total) * 100, fill: "var(--color-epargne)" },
    ];

    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        depensesFixes: {
            label: "Dépenses fixes",
            color: "hsl(var(--chart-1))",
        },
        loisir: {
            label: "Loisir",
            color: "hsl(var(--chart-2))",
        },
        epargne: {
            label: "Épargne",
            color: "hsl(var(--chart-3))",
        },
    } satisfies ChartConfig

    return <>
        <ResponsiveContainer width="100%" height={170}>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
            >
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="pourcentage"
                        nameKey="categorie"
                        innerRadius={40}
                        outerRadius={50}
                        label={({ pourcentage, montant, objectif }) => `${pourcentage.toFixed(2)}%, ${objectif}% (${montant.toFixed(2)} €)`}
                    >
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="text-red-100"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="text-xs italic font-thin fill-foreground"
                                            >
                                                {`${addSpace(total)} €`}
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                        /></Pie>
                </PieChart>
            </ChartContainer>
        </ResponsiveContainer>
    </>
}
