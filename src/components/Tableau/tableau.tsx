import { Link } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../@/components/ui/table";
import { addSpace, formatDate } from "../../utils/fonctionnel";

export default function Tableau(props: any) {

    return (
        <>
            {props.transactions && props.transactions.length > 0 ? (
                <Table className="w-full flex flex-col px-1 ">
                    <TableHeader>
                        <TableRow className="w-full flex flex-row my-1">
                            <TableHead className="w-full">ID</TableHead>
                            <TableHead className="w-full">Titre</TableHead>
                            <TableHead className="w-full">Catégorie</TableHead>
                            <TableHead className="w-full">Date</TableHead>
                            <TableHead className="w-full">Montant</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="flex flex-col justify-center items-center w-full">
                        {props.transactions.map((transaction: any) => (
                            <Link to={transaction._id} className="w-full" key={transaction._id}>
                                <TableRow className="rounded w-full flex my-1 flex-row items-center bg-zinc-900 cursor-pointer hover:bg-zinc-700 transition-all">
                                    <TableCell className="w-full">{transaction._id.substring(4, 8)}</TableCell>
                                    <TableCell className="w-full">{transaction.titre}</TableCell>
                                    <TableCell className="w-full">{transaction.categorie === "Autre" ? transaction.autreCategorie : transaction.categorie}</TableCell>
                                    <TableCell className="w-full">{formatDate(transaction.date)}</TableCell>
                                    <TableCell className="w-full"><b>{addSpace(transaction.montant)} €</b></TableCell>
                                </TableRow>
                            </Link>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>Aucune transaction n'a été trouvée ...</p>
            )}
        </>
    );
}
