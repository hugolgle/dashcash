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
        { categorie: "Dépenses fixes", pourcentage: (parseInt(props.dataDf)), fill: "var(--color-depensesFixes)" },
        { categorie: "Loisir", pourcentage: (parseInt(props.dataLoisir)), fill: "var(--color-loisir)" },
        { categorie: "Épargne", pourcentage: (parseInt(props.dataEpargne)), fill: "var(--color-epargne)" },
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
    console.log(props.dataEpargne)
    return <>
        <ResponsiveContainer width="100%" height={170}>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={chartData}
                        dataKey="pourcentage"
                        nameKey="categorie"
                        innerRadius={30}
                        outerRadius={50}
                        label={({ pourcentage }) => `${(pourcentage / 10).toFixed(0)} %`}
                    />
                </PieChart>
            </ChartContainer>
        </ResponsiveContainer>
    </>

}
