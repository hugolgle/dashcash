import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { infoUser } from "../../utils/users";
import { getSubscriptionById } from "../../utils/operations";
import { deleteSubscriptions, editSubscriptions, getSubscriptions } from "../../redux/actions/subscription.action";
import BtnReturn from "../../components/button/btnReturn";
import { separateMillier } from "../../utils/fonctionnel";

export default function Abonnement() {

    const userInfo = infoUser()

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
    const abonnement = getSubscriptionById(id, userInfo.id)

    const [selectedSubscriptionTitre, setSelectedTitre] = useState(abonnement.titre);

    const [selectedSubscriptionDetail, setSelectedDetail] = useState(abonnement.detail);

    const [selectedSubscriptionMontant, setSelectedMontant] = useState(abonnement.montant);

    const [selectedSubscriptionRecurrence, setSelectedRecurrence] = useState(abonnement.recurrence);

    const handleTitre = (event: any) => {
        setSelectedTitre(event.target.value);
    };

    const handleDetail = (event: any) => {
        setSelectedDetail(event.target.value);
    };

    const handleMontant = (event: any) => {
        setSelectedMontant(event.target.value);
    };

    const handleRecurrence = (event: any) => {
        setSelectedRecurrence(event.target.value);
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleEditSubscription = async (e: any) => {
        e.preventDefault()
        const subscriptionData = {
            id: abonnement._id,
            titre: selectedSubscriptionTitre,
            detail: selectedSubscriptionDetail,
            montant: separateMillier(selectedSubscriptionMontant),
            recurrence: selectedSubscriptionRecurrence
        };
        await dispatch(editSubscriptions(subscriptionData) as any);
        dispatch(getSubscriptions() as any);
        navigate(-1);
    };


    const handleDeleteSubscription = async () => {
        await dispatch(deleteSubscriptions(id) as any);
        dispatch(getSubscriptions() as any);
        navigate(-1);
    };
    return <><section>
        <BtnReturn />
        <form onSubmit={handleEditSubscription} className='flex flex-col justify-center items-center gap-5 px-36 py-10'>

            <input
                className="w-96 h-10 px-2 rounded-xl"
                value={selectedSubscriptionTitre}
                type="text"
                maxLength={50}
                placeholder="Titre"
                onChange={(e) => { handleTitre(e) }}
                required
            />
            <textarea
                value={selectedSubscriptionDetail}
                className="w-96 h-10 px-2 rounded-xl"
                maxLength={250}
                placeholder="Détails"
                onChange={(e) => { handleDetail(e) }}
            />
            <input
                value={selectedSubscriptionMontant}
                className="w-96 h-10 px-2 rounded-xl"
                type="number"
                min="0"
                step="0.01"
                placeholder="Montant"
                onChange={(e) => { handleMontant(e) }}
                required
            />
            <select id='action' value={selectedSubscriptionRecurrence} className="w-96 h-10 px-2 rounded-xl" onChange={(e) => { handleRecurrence(e) }} required>
                <option className="text-slate-400" value="" disabled selected>Entrez la réccurence</option>

                <option key="1" value="Tous les mois">Tous les mois</option>
                <option key="2" value="Toutes les 4 semaines">Toutes les 4 semaines</option>

            </select>

            <button className="rounded-xl w-1/4 hover:border-blue-500">Modifier l'abonnement</button>
        </form >
        <button className="rounded-xl w-1/4 hover:border-red-500" onClick={handleDeleteSubscription}>Supprimer l'abonnement</button>

        {message ? (
            <div className={`absolute animate-[fadeIn2_0.3s_ease-in-out_forwards] bottom-4 right-4 flex justify-center items-center`}>
                <p className={`p-4 bg-lime-900 w-60 rounded ${message ? 'opacity-100' : 'hidden'}`}>
                    {message}
                </p>
            </div >
        ) : null
        }
    </section>
    </>
}