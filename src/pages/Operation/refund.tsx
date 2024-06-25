import { useNavigate, useParams } from "react-router-dom";

import { separateMillier } from "../../utils/fonctionnel";


import { editTransactions, getTransactions } from "../../redux/actions/transaction.action";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteRefund, editRefund } from "../../redux/actions/refund.action";
import { infoUser } from "../../utils/users";
import { getRefundByTransactionId, getTransactionById } from "../../utils/operations";

export default function Refund() {

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

    const { id, idRefund } = useParams()
    const refund = getRefundByTransactionId(id, idRefund, userInfo.id)
    const transaction = getTransactionById(id, userInfo.id)

    const [selectedRefundTitre, setSelectedTitre] = useState(refund.titre);

    const [selectedRefundDate, setSelectedDate] = useState(refund.date);

    const [selectedRefundDetail, setSelectedDetail] = useState(refund.detail);

    const [selectedRefundMontant, setSelectedMontant] = useState(refund.montant);

    const handleTitre = (event: any) => {
        setSelectedTitre(event.target.value);
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

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleEditRefund = async (e: any) => {
        e.preventDefault()
        const refundData = {
            id: refund._id,
            titre: selectedRefundTitre,
            date: selectedRefundDate,
            detail: selectedRefundDetail,
            montant: selectedRefundMontant
        };
        await dispatch(editRefund(id, refundData) as any);
        navigate(-1);
    };
    function removeTiret(number: any): number {
        return parseFloat(number.replace(/-/g, ''));
    }

    const montantNumerique = parseFloat(transaction.montant);
    const selectedMontantNumerique = removeTiret(refund.montant);

    const newMontant = montantNumerique - selectedMontantNumerique;

    const editData = {
        id: id,
        montant: separateMillier(newMontant)
    };
    const handleDeleteRefund = async () => {
        await dispatch(deleteRefund(id, refund._id) as any);
        await dispatch(editTransactions(editData) as any)
        dispatch(getTransactions() as any);
        navigate(-1);
    };
    return <>
        <form onSubmit={handleEditRefund} className='flex flex-col justify-center items-center gap-5 px-36 py-10'>

            <input className="w-96 h-10 px-2 rounded-xl" value={selectedRefundTitre} type="text" name="" maxLength={50} id="" placeholder="Titre" onChange={(e) => { handleTitre(e) }} required />

            <input value={selectedRefundDate} className="w-96 h-10 px-2 rounded-xl text-slate-400" type="date" name="" id="" onChange={(e) => { handleDate(e) }} required />

            <textarea value={selectedRefundDetail} className="w-96 h-10 px-2 rounded-xl" name="" id="" placeholder="Détails" maxLength={250} onChange={(e) => { handleDetail(e) }} />

            <input value={selectedRefundMontant} className="w-96 h-10 px-2 rounded-xl" type="number" min="-10" step="0.01" name="" id="" placeholder="Montant" onChange={(e) => { handleMontant(e) }} required />

            <button className="rounded-xl w-1/4 hover:border-blue-500">Modifier le remboursement</button>
        </form >
        <button className="rounded-xl w-1/4 hover:border-blue-500" onClick={handleDeleteRefund}>Supprimer le remboursement</button>

        {message ? (
            <div className={`absolute animate-[fadeIn2_0.3s_ease-in-out_forwards] bottom-4 right-4 flex justify-center items-center`}>
                <p className={`p-4 bg-lime-900 w-60 rounded ${message ? 'opacity-100' : 'hidden'}`}>
                    {message}
                </p>
            </div >
        ) : null
        }
    </>
}