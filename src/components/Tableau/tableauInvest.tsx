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

export default function TableauInvest(props: any) {

    return (
        <>
            {props.investments && props.investments.length > 0 ? (
                <Table className="w-full flex flex-col px-1 ">
                    <TableHeader>
                        <TableRow className="w-full flex flex-row my-1">
                            <TableHead className="w-full">ID</TableHead>
                            <TableHead className="w-full">Plateforme</TableHead>
                            <TableHead className="w-full">Type</TableHead>
                            <TableHead className="w-full">Date</TableHead>
                            <TableHead className="w-full">Montant</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="flex flex-col justify-center items-center w-full">
                        {props.investments.map((investment: any) => (
                            <Link to={investment._id} className="w-full" key={investment._id}>
                                <TableRow className="rounded w-full flex my-1 flex-row items-center bg-zinc-900 cursor-pointer hover:bg-zinc-700 transition-all">
                                    <TableCell className="w-full">{investment._id.substring(4, 8)}</TableCell>
                                    <TableCell className="w-full">{investment.plateforme}</TableCell>
                                    <TableCell className="w-full">{investment.type}</TableCell>
                                    <TableCell className="w-full">{formatDate(investment.date)}</TableCell>
                                    <TableCell className="w-full"><b>{addSpace(investment.montant)} €</b></TableCell>
                                </TableRow>
                            </Link>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>Aucun investissements n'a été trouvée ...</p>
            )}
        </>
    );
}
