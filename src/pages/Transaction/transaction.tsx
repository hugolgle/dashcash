
import { CircleArrowLeft, CirclePlus } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { Path, convertDateHour, formatDate, formatMontant } from "../../utils/fonctionnel";
import { getOperationById } from "../../utils/operations";

import { categorieRecette, categorieDepense } from '../../../public/categories.json'

import { deleteOperations, editOperations, getOperations } from "../../redux/actions/operation.action";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { infoUser } from "../../utils/users";


export default function Transaction() {
    const userInfo = infoUser()
    const location = useLocation()
    const first = Path(location, 1)
    const second = Path(location, 2)

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 7000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const { id } = useParams()
    const operation = getOperationById(id, userInfo.id)

    const [selectedDelete, setSelectedDelete] = useState(false);

    const [selectedUpdate, setSelectedUpdate] = useState(false);

    const [update, setUpdate] = useState(false);

    const [selectedTitre, setSelectedTitre] = useState(operation.titre);

    const [selectedCategorie, setSelectedCategorie] = useState(operation.categorie);

    const [selectedAutreCategorie, setSelectedAutreCategorie] = useState(operation.autreCategorie);

    const [selectedDate, setSelectedDate] = useState(operation.date);

    const [selectedDetail, setSelectedDetail] = useState(operation.detail);

    const [selectedMontant, setSelectedMontant] = useState(operation.montant);

    const handleTitre = (event: any) => {
        setSelectedTitre(event.target.value);
    };

    const handleCategorie = (event: any) => {
        setSelectedCategorie(event.target.value);
    };

    const handleAutreCategorie = (event: any) => {
        setSelectedAutreCategorie(event.target.value);
    };

    const handleDate = (event: any) => {
        setSelectedDate(event.target.value);
    };

    const handleDetail = (event: any) => {
        setSelectedDetail(event.target.value);
    };

    const handleMontant = (event: any) => {
        setSelectedMontant(event.target.value);
    };

    const handleInputChange = () => {
        setUpdate(true);
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleDeleteConfirmation = async () => {
        await dispatch(deleteOperations(id) as any);
        navigate(`/${first}/${second}`);
        dispatch(getOperations() as any);
        localStorage.setItem('transactionDeleted', 'true');
    };



    function removeTiret(number: any): number {
        return parseFloat(number.replace(/-/g, ''));
    }

    const handleEditConfirmation = async () => {
        const editData = {
            id: operation._id,
            type: operation.type,
            titre: selectedTitre,
            categorie: selectedCategorie,
            autreCategorie: selectedAutreCategorie,
            date: selectedDate,
            detail: selectedDetail,
            montant: formatMontant(removeTiret(selectedMontant), operation.type)
        }
        await dispatch(editOperations(editData) as any);
        setMessage("L'opération a été modifié avec succès !");
        dispatch(getOperations() as any);
        setSelectedUpdate(false)
    };

    return <>
        <div className="w-full h-auto relative">
            {selectedUpdate ? (
                <input className="text-5xl animate-[pulseEdit_1s_ease-in-out_infinite] rounded-2xl text-center font-thin mb-9 bg-transparent" value={selectedTitre} type="text" name="" id="" onChange={(e) => { handleTitre(e); handleInputChange(); }} required />
            ) : (
                <h2 className="text-5xl font-thin mb-9">{operation.titre}</h2>
            )}

            <div className='absolute top-0 flex flex-row gap-2 w-full'>
                <Link to={`/${first}/${second}`}>
                    <CircleArrowLeft className="hover:scale-125 ease-in-out duration-300" />
                </Link>
                <Link to={`/${first}/add`}>
                    <CirclePlus className="hover:scale-125 ease-in-out duration-300" />
                </Link>
            </div>
        </div >
        <section className=" flex flex-row gap-4">
            <div className="flex flex-col w-3/4 gap-4">
                <div className="h-40 p-8 bg-zinc-900 rounded-2xl flex justify-center items-center ">
                    <h2 className="text-4xl">{operation._id}</h2>
                </div>
                <div className="flex flex-row gap-4">
                    <div className={`h-40 w-full  bg-zinc-900 flex justify-center items-center rounded-2xl ${selectedUpdate ? 'animate-[pulseEdit_1s_ease-in-out_infinite] p-0' : 'p-8'}`}>
                        {selectedUpdate ? (
                            <select id='action' value={selectedCategorie} className="h-full w-full bg-transparent text-center text-4xl rounded-2xl" onChange={(e) => { handleCategorie(e); handleInputChange(); }} required>
                                <option className="text-slate-400" value="" disabled selected>Entrez la catégorie</option>
                                {operation.type === "Dépense" && categorieDepense.map(({ name }) => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                                {operation.type === "Recette" && categorieRecette.map(({ name }) => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        ) : (
                            <h2 className="text-4xl">{operation.categorie === "Autre" ? operation.autreCategorie : operation.categorie}</h2>
                        )}
                    </div>
                    {selectedCategorie === "Autre" && selectedUpdate && (
                        <div className={`h-40 w-full p-8 bg-zinc-900 flex justify-center items-center rounded-2xl ${selectedUpdate ? 'animate-[pulseEdit_1s_ease-in-out_infinite] p-0' : 'p-8'}`}>
                            <input className="h-full w-full bg-transparent text-center text-4xl rounded-2xl placeholder:text-xl" type="text" value={selectedAutreCategorie} name="titre" id="autreTitre" onChange={(e) => { handleAutreCategorie(e); handleInputChange(); }} placeholder="Entrez une autre categorie" />
                        </div>
                    )}

                    <div className={`h-40 w-full bg-zinc-900 flex justify-center items-center rounded-2xl ${selectedUpdate ? 'animate-[pulseEdit_1s_ease-in-out_infinite] p-0' : 'p-8'}`}>
                        {
                            selectedUpdate ? (
                                <input className="h-full w-full bg-transparent text-center text-4xl  rounded-2xl" value={selectedDate} type="date" name="" id="" onChange={(e) => { handleDate(e); handleInputChange(); }} />
                            ) : (
                                <h2 className="text-4xl">{formatDate(operation.date)}</h2>
                            )
                        }

                    </div>
                </div>
                <div className={`h-40 w-full  bg-zinc-900 flex justify-center items-center rounded-2xl ${selectedUpdate ? 'animate-[pulseEdit_1s_ease-in-out_infinite] p-0' : 'p-8'}`}>
                    {
                        selectedUpdate ? (
                            <input className="h-full w-full bg-transparent text-center text-4xl  rounded-2xl" value={removeTiret(selectedMontant)} type="number" step="0.5" name="" id="" onChange={(e) => { handleMontant(e); handleInputChange(); }} />
                        ) : (
                            <h2 className="text-4xl">{operation.montant} €</h2>
                        )
                    }

                </div>
                <div className={`h-40 w-full bg-zinc-900 flex justify-center items-center rounded-2xl ${selectedUpdate ? 'animate-[pulseEdit_1s_ease-in-out_infinite] p-0' : 'p-8'}`}>
                    {
                        selectedUpdate ? (
                            <textarea className="h-full w-full bg-transparent text-center text-xl  rounded-2xl" value={selectedDetail} name="" id="" onChange={(e) => { handleDetail(e); handleInputChange(); }} />
                        ) : (
                            <h2 className="text-xl">{operation.detail ? operation.detail : "Aucun détail ajouté"}</h2>
                        )
                    }

                </div>
            </div>
            <div className="flex flex-col justify-between w-1/4 gap-4">
                <div className="flex flex-col gap-4">
                    <div className="p-8 h-32 bg-zinc-900 rounded-2xl flex justify-center items-center"><p>Ajouter le : <br /><b>{convertDateHour(operation.createdAt)}</b></p></div>
                    <div className="p-8 h-32 bg-zinc-900 rounded-2xl flex justify-center items-center"><p>Derniere modification le : <br /><b>{convertDateHour(operation.updatedAt)}</b></p></div>
                </div>
                <div className="flex flex-col gap-4">
                    {selectedUpdate && update === true ? (
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <p className="text-sm">Êtes-vous sûr de vouloir modifier ?</p>
                            <div className="flex gap-4">
                                <div className="p-8 border-2 border-red-900 bg-zinc-900 rounded-2xl cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95" onClick={() => handleEditConfirmation()}>Oui</div>
                                <div className="p-8 border-2 border-zinc-900 bg-zinc-900 rounded-2xl cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95 hover:border-green-900" onClick={() => setSelectedUpdate(false)}>Non</div>
                            </div>
                        </div>
                    ) : selectedUpdate ? (
                        <div className="p-8 h-32 bg-zinc-900 rounded-2xl flex justify-center items-center hover:bg-opacity-80 cursor-pointer hover:scale-95" onClick={() => setSelectedUpdate(false)}>Annuler</div>
                    ) : (
                        <div className="p-8 h-32 bg-zinc-900 rounded-2xl flex justify-center items-center hover:bg-opacity-80 cursor-pointer hover:scale-95" onClick={() => setSelectedUpdate(true)}>Modifier</div>
                    )}

                    <div className="flex flex-col gap-4 justify-center items-center">

                        {selectedDelete ? (
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <p className="text-sm">Êtes-vous sûr ?</p>
                                <div className="flex gap-4">
                                    <div className="p-8 border-2 border-red-900 bg-zinc-900 rounded-2xl cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95" onClick={handleDeleteConfirmation}>Oui</div>
                                    <div className="p-8 border-2 border-zinc-900 bg-zinc-900 rounded-2xl cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95 hover:border-green-900" onClick={() => setSelectedDelete(false)}>Non</div>
                                </div>
                            </div>
                        ) : (
                            <div className={`w-full p-8 h-32 border-2 border-red-900 bg-zinc-900  rounded-2xl cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95`} onClick={() => setSelectedDelete(true)}>Supprimer</div>
                        )}
                    </div>

                </div>
            </div>
            {message ? (
                <div className={`absolute bottom-4 right-4 flex justify-center transition-all items-center animate-[fadeIn_7s_ease-in-out_forwards]`}>
                    <p className="p-4 bg-lime-900 w-60 rounded shadow-2xl shadow-black">
                        {message}
                    </p>
                </div>
            ) : null}
        </section >
    </>
}