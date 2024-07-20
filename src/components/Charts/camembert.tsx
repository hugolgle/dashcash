"use client"

import { Pie, PieChart, ResponsiveContainer } from "recharts"

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../../@/components/ui/chart"

export function Camembert(props: any) {

    const chartData = [
        { categorie: "Dépenses fixes", value: (parseFloat(props.dataDf)), fill: "var(--color-depensesFixes)" },
        { categorie: "Loisir", value: (parseFloat(props.dataLoisir)), fill: "var(--color-loisir)" },
        { categorie: "Épargne", value: (parseFloat(props.dataEpargne)), fill: "var(--color-epargne)" },
    ]

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
                        dataKey="value"
                        nameKey="categorie"
                        innerRadius={30}
                        outerRadius={50}
                        label={({ value }) => `${(value.toFixed(2))} €`}
                    />
                </PieChart>
            </ChartContainer>
        </ResponsiveContainer>
    </>

}
