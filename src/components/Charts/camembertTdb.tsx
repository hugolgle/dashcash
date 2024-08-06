"use client"

import * as React from "react";
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Label, TooltipProps } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip } from "../../../@/components/ui/chart";
import { addSpace } from "../../utils/fonctionnel";



export function CamembertTdb(props: any) {
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
            color: "hsl(var(--chart-2))",
        },
        loisir: {
            label: "Loisir",
            color: "hsl(var(--chart-1))",
        },
        epargne: {
            label: "Épargne",
            color: "hsl(var(--chart-3))",
        },
    } satisfies ChartConfig;

    // Custom Legend Component
    const renderCustomLegend = (props: any) => {
        const { payload } = props;
        return (
            <ul className="flex items-center justify-around mt-4 w-full">
                {payload?.map((entry: any, index: number) => (
                    <li key={`item-${index}`} className="flex items-center my-1">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-xs italic">{entry.value} ({entry.payload.pourcentage.toFixed(2)}%)</span>
                    </li>
                ))}
            </ul>
        );
    };

    // Custom Tooltip Content Component
    const CustomTooltipContent = (props: any) => {
        const { active, payload } = props;
        if (active && payload && payload.length) {
            const { name, value, payload: data } = payload[0];
            const pourcentage = data.pourcentage.toFixed(2);
            const objectif = data.objectif.toFixed(2);


            return (
                <div className="bg-white dark:bg-black text-xs p-2 rounded-xl shadow-2xl">
                    <div className="text-left mb-1 flex items-center gap-2">
                        <div className="w-2 h-2 rounded" style={{ backgroundColor: data.fill }}></div>
                        <p>{name}</p>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between gap-4">
                            <div className="flex flex-row justify-center items-center gap-1">
                                <p className="opacity-75">Montant</p>
                            </div>
                            <p className="italic font-black">{addSpace(value.toFixed(2))} €</p>
                        </div>
                        <div className="flex flex-row justify-between gap-4">
                            <div className="flex flex-row justify-center items-center gap-1">
                                <p className="opacity-75">Pourcentage</p>
                            </div>
                            <p className="italic font-black">{pourcentage ? pourcentage : "0"} %</p>
                        </div>
                        <div className="flex flex-row justify-between gap-4">
                            <div className="flex flex-row justify-center items-center gap-1">
                                <p className="opacity-75">Objectif</p>
                            </div>
                            <p className="italic font-black">{objectif} %</p>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={250}>
            <ChartContainer config={chartConfig} className="aspect-square max-h-[250px]">
                <PieChart>
                    <ChartTooltip cursor={false} content={<CustomTooltipContent />} />
                    <Pie
                        data={chartData}
                        dataKey="montant"
                        nameKey="categorie"
                        innerRadius={40}
                        outerRadius={60}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        <Label
                            content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="text-red-100 flex-wrap"
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className="text-xs italic font-thin fill-foreground"
                                            >
                                                {`${addSpace(total)} €`}
                                            </tspan>
                                        </text>
                                    );
                                }
                            }}
                        />
                    </Pie>
                    <Legend content={renderCustomLegend} />
                </PieChart>
            </ChartContainer>
        </ResponsiveContainer>
    );
}
