
import { CircleArrowLeft, CirclePlus } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Path, { convertDateHour, formatDate, getOperationById } from "../../utils/utils";
import { deleteOperations, getOperations } from "../../redux/actions/operation.action";
import { useDispatch } from "react-redux";


export default function Transaction() {

    const location = useLocation()
    const first = Path(location, 1)
    const second = Path(location, 2)
    const { id } = useParams()
    const operation = getOperationById(id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const deleteSubmit = async (event: any) => {
        event.preventDefault()
        const isConfirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer l'opération d' ${id} ?`);
        if (isConfirmed) {
            // Déplacer la suppression ici, seulement si l'utilisateur a confirmé
            await dispatch(deleteOperations(id) as any); // Attendez la suppression
            alert("L'opération a été supprimée avec succès !");
            navigate(`/${first}/${second}`);
            // Après la suppression, récupérer à nouveau les opérations
            dispatch(getOperations() as any);
        } else {
            alert("Suppression annulée !");
        }
    };

    return <>
        <div className="w-full relative">
            <h2 className="text-5xl font-thin mb-9">{operation.titre}</h2>
            <div className='absolute top-0 flex flex-row justify-between w-full'>
                <Link to={`/${first}/${second}`}>
                    <CircleArrowLeft className="hover:scale-125 ease-in-out duration-300" />
                </Link>
                <div className='flex flex-row gap-2'>
                    <Link to={`/${first}/add`}>
                        <CirclePlus className="hover:scale-125 ease-in-out duration-300" />
                    </Link>
                </div>
            </div>
        </div >
        <section className=" flex flex-row gap-4">
            <div className="flex flex-col w-3/4 gap-4">
                <div className="h-40 p-8 bg-zinc-900 rounded-2xl flex justify-center items-center ">
                    <h2 className="text-4xl">{operation._id}</h2>
                </div>
                <div className="flex flex-row gap-4">
                    <div className="h-40 w-full p-8 bg-zinc-900 flex justify-center items-center rounded-2xl ">
                        <h2 className="text-4xl">{operation.categorie}</h2>
                    </div>
                    <div className="h-40 w-full p-8 bg-zinc-900 flex justify-center items-center rounded-2xl ">
                        <h2 className="text-4xl">{formatDate(operation.date)}</h2>
                    </div>
                </div>
                <div className="h-40 p-8 bg-zinc-900 rounded-2xl flex justify-center items-center ">
                    <h2 className="text-4xl">{operation.montant} €</h2>
                </div>
                <div className="h-40 p-8 bg-zinc-900 rounded-2xl flex justify-center items-center ">
                    <h2 className="text-4xl">{operation.detail ? operation.detail : "Aucun détail ajouté"}</h2>
                </div>
            </div>
            <div className="flex flex-col justify-between w-1/4 gap-4">
                <div className="flex flex-col gap-4">
                    <div className="p-8 h-32 bg-zinc-900 rounded-2xl flex justify-center items-center"><p>Ajouter le : <br /><b>{convertDateHour(operation.createdAt)}</b></p></div>
                    <div className="p-8 h-32 bg-zinc-900 rounded-2xl flex justify-center items-center"><p>Derniere modification le : <br /><b>{convertDateHour(operation.updatedAt)}</b></p></div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="p-8 h-32 bg-zinc-900 rounded-2xl flex justify-center items-center hover:bg-opacity-80 hover:scale-95" >Modifier</div>
                    <div className="p-8 h-32 bg-red-600 rounded-2xl cursor-pointer flex justify-center items-center hover:bg-opacity-80 hover:scale-95" onClick={(event) => deleteSubmit(event)}>Supprimer</div>
                </div>
            </div>
        </section>
    </>
}