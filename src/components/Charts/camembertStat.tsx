"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "../../../@/components/ui/chart"
import { aggregateTransactions } from "../../utils/operations"
import { addSpace } from "../../utils/fonctionnel"

// Custom Tooltip Content Component
const CustomTooltipContent = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white dark:bg-black text-xs p-2 rounded-xl shadow-2xl ">
                <div className="text-left mb-1 flex items-center gap-2">
                    <div className="w-2 h-2 rounded" style={{ backgroundColor: data.fill }}></div>
                    <p>{data.name}</p>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between gap-4">
                        <div className="flex flex-row justify-center items-center gap-1">
                            <p className=" opacity-75">Montant</p>
                        </div>
                        <p className="italic font-black">{addSpace(data.value.toFixed(2))} €</p>
                    </div>
                    <div className="flex flex-row justify-between gap-4">
                        <div className="flex flex-row justify-center items-center gap-1">
                            <p className=" opacity-75">Pourcentage</p>
                        </div>
                        <p className="italic font-black">{data.pourcentage.toFixed(2)} %</p>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

// Custom Legend Component
const renderCustomLegend = (props: any) => {
    const { payload } = props;
    const payloadSort = payload.sort((a: any, b: any) => b.payload.pourcentage - a.payload.pourcentage);

    return (
        <ul className="flex flex-col justify-center mt-4">
            {
                payloadSort.map((entry: any, index: number) => (
                    <li key={`item-${index}`} className="flex items-center my-1">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-xs font-thin italic">{entry.value} ({entry.payload.pourcentage.toFixed(2)}%)</span>
                    </li>
                ))
            }
        </ul>
    );
};

export function CamembertStat(props: any) {
    // Définir les couleurs de catégorie avec des valeurs hexadécimales
    const categoryColors: { [key: string]: string } = props.categorie.reduce((acc: { [key: string]: string }, category: { name: string, color: string }) => {
        acc[category.name] = category.color;
        return acc;
    }, {});

    const chartData = aggregateTransactions(props.transactions);
    const totalAmount = chartData.reduce((sum, item) => sum + parseFloat(item.montant), 0);

    const transformedData = chartData.map(item => ({
        name: item.nomCate,
        value: parseFloat(item.montant),
        pourcentage: (parseFloat(item.montant) / totalAmount) * 100,
        fill: categoryColors[item.nomCate]
    }));

    const chartConfig: ChartConfig = {
        ...Object.keys(categoryColors).reduce((acc, category) => {
            acc[category.toLocaleLowerCase()] = {
                label: category,
                color: categoryColors[category],
            };
            return acc;
        }, {} as Record<string, { label: string; color: string }>)
    };

    return (
        <ResponsiveContainer width="100%" height={260}>
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
            >
                <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<CustomTooltipContent />}
                    />
                    <Pie
                        data={transformedData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={35}
                        outerRadius={60}
                    >
                        {transformedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Legend layout="vertical" verticalAlign="middle" align="right" content={renderCustomLegend} />
                </PieChart>
            </ChartContainer>
        </ResponsiveContainer>
    )
}
