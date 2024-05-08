import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../@/components/ui/table";
import Add from "../../components/Add/add";

export default function Depense() {
    return <>
        <h2 className="text-5xl font-black mb-9">Dépenses</h2>
        <Add />
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Categorie</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Montant</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table >

    </>

}
