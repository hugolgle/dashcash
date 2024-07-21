"use client"

import { Pie, PieChart, ResponsiveContainer } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../../@/components/ui/chart"

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
                        innerRadius={20}
                        outerRadius={40}
                        label={({ pourcentage, montant, objectif }) => `${pourcentage.toFixed(2)} %, ${objectif} % (${montant.toFixed(2)} €)`}
                    />
                </PieChart>
            </ChartContainer>
        </ResponsiveContainer>
    </>
}
