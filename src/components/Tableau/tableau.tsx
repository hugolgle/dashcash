import { Link } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../@/components/ui/table";

export default function Tableau(props: any) {
    return <>
        <Table className="w-full flex flex-col">
            <TableHeader>
                <TableRow className="w-full flex flex-row my-3">
                    <TableHead className="w-full">ID</TableHead>
                    <TableHead className="w-full">Titre</TableHead>
                    <TableHead className="w-full">Catégorie</TableHead>
                    <TableHead className="w-full">Date</TableHead>
                    <TableHead className="w-full">Montant</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="flex flex-col justify-center items-center w-full">

                {props.operations.map((operation: any) => (
                    <Link to={operation._id} className="w-full">
                        <TableRow className="rounded w-full flex my-1 flex-row bg-zinc-900 cursor-pointer hover:bg-zinc-700 transition-all" key={operation._id}>
                            <TableCell className="w-full">{operation._id.substring(4, 8)}</TableCell>
                            <TableCell className="w-full">{operation.titre}</TableCell>
                            <TableCell className="w-full">{operation.categorie}</TableCell>
                            <TableCell className="w-full">{operation.date}</TableCell>
                            <TableCell className="w-full">{operation.montant} €</TableCell>
                        </TableRow>
                    </Link>
                ))}
            </TableBody >
        </Table >
    </>

}
