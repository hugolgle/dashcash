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
                        <TableRow className="w-full flex flex-row h-7">
                            <TableHead className="w-full">ID</TableHead>
                            <TableHead className="w-full">Plateforme</TableHead>
                            <TableHead className="w-full">Type</TableHead>
                            <TableHead className="w-full">Titre</TableHead>
                            <TableHead className="w-full">Date</TableHead>
                            <TableHead className="w-full">Montant</TableHead>
                            {props.sold === true && <>
                                <TableHead className="w-full">Montant vendu</TableHead>
                                <TableHead className="w-full">Bénéfice</TableHead>
                            </>}
                            {props.sold === null && <>
                                <TableHead className="w-full">Statut</TableHead>
                            </>}
                        </TableRow>
                    </TableHeader>
                    <TableBody className="flex flex-col justify-center items-center w-full">
                        {props.investments.map((investment: any) => (
                            <Link to={investment._id} className="w-full" key={investment._id}>
                                <TableRow className="rounded flex my-1 flex-row items-center bg-zinc-100 dark:bg-zinc-900 cursor-pointer hover:bg-opacity-75 hover:dark:bg-opacity-75 transition-all">
                                    <TableCell className="w-full">{investment._id.substring(4, 8)}</TableCell>
                                    <TableCell className="w-full">{investment.plateforme}</TableCell>
                                    <TableCell className="w-full">{investment.type}</TableCell>
                                    <TableCell className="w-full">{investment.titre}</TableCell>
                                    <TableCell className="w-full">{formatDate(investment.date)}</TableCell>
                                    <TableCell className="w-full"><b>- {addSpace(investment.montant)} €</b></TableCell>
                                    {props.sold === true && <>
                                        <TableCell className="w-full"><b>{addSpace(investment.montantVendu)} €</b></TableCell>
                                        <TableCell className="w-full">
                                            <b>
                                                {investment.benefice >= 0 ? "+ " : ""}
                                                {addSpace(investment.benefice)} €
                                            </b>
                                        </TableCell>
                                    </>}
                                    {props.sold === null && <>
                                        <TableCell className="w-full">{investment.isSold === true ? "Vendu" : "En cours"}</TableCell>
                                    </>}
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
