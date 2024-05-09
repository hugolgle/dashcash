import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../@/components/ui/table";

const invoices = [
    {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    },
    {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    },
    {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    },
    {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    }, {
        invoice: "aS4R",
        paymentStatus: "Abonnement",
        totalAmount: "9.99 €",
        paymentMethod: "08/05/2024",
    },
]

export default function Tableau() {
    return <>
        <Table className="w-full flex flex-col">
            <TableHeader>
                <TableRow className="w-full flex flex-row">
                    <TableHead className="w-full">ID</TableHead>
                    <TableHead className="w-full">Catégorie</TableHead>
                    <TableHead className="w-full">Date</TableHead>
                    <TableHead className="w-full">Montant</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="flex flex-col justify-center items-center gap-2 w-full">
                {invoices.map((invoice) => (
                    <TableRow className="rounded w-full flex flex-row bg-zinc-900 cursor-pointer hover:bg-zinc-700 transition-all" key={invoice.invoice}>
                        <TableCell className="w-full"> {invoice.invoice}</TableCell>
                        <TableCell className="w-full">{invoice.paymentStatus}</TableCell>
                        <TableCell className="w-full">{invoice.paymentMethod}</TableCell>
                        <TableCell className="w-full">{invoice.totalAmount}</TableCell>
                    </TableRow>
                ))}
            </TableBody >
        </Table >

    </>

}
