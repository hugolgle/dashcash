
import { CircleArrowLeft, CirclePlus } from "lucide-react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { Path, addSpace, convertDateHour, convertirFormatDate, formatDate, formatMontant, separateMillier } from "../utils/fonctionnel";
import { getRefundsByTransactionId, getTransactionById } from "../utils/operations";

import { categorieRecette, categorieDepense } from '../../public/categories.json'

import { deleteTransactions, editTransactions, getTransactions } from "../redux/actions/transaction.action";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import PageAddRefund from "../pages/PageForm/pageAddRefund";
import { deleteRefund, editRefund } from "../redux/actions/refund.action";
import { infoUser } from "../utils/users";

// import { editRefund, deleteRefund } from "../../redux/actions/refund.action";



export default function LayoutRefund() {

    const userInfo = infoUser()
    const location = useLocation()
    const first = Path(location, 1)
    const second = Path(location, 2)
    const third = Path(location, 3)

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
    const refunds = getRefundsByTransactionId(id, userInfo.id)



    // const [selectedDelete, setSelectedDelete] = useState(false);

    // const [selectedUpdate, setSelectedUpdate] = useState(false);

    // const [update, setUpdate] = useState(false);

    // const [selectedRefundTitre, setSelectedTitre] = useState(refund.titre);

    // const [selectedRefundDate, setSelectedDate] = useState(refund.date);

    // const [selectedRefundDetail, setSelectedDetail] = useState(refund.detail);

    // const [selectedRefundMontant, setSelectedMontant] = useState(refund.montant);

    // const handleTitre = (event: any) => {
    //     setSelectedTitre(event.target.value);
    // };

    // const handleDate = (event: any) => {
    //     setSelectedDate(event.target.value);
    // };

    // const handleDetail = (event: any) => {
    //     setSelectedDetail(event.target.value);
    // };

    // const handleMontant = (event: any) => {
    //     setSelectedMontant(event.target.value);
    // };

    // const handleInputChange = () => {
    //     setUpdate(true);
    // };

    // const navigate = useNavigate()
    // const dispatch = useDispatch()



    // Fonction pour modifier un remboursement
    // const handleEditRefund = async () => {
    //     const refundData = {
    //         id: refund._id,
    //         titre: selectedRefundTitre,
    //         date: selectedRefundDate,
    //         detail: selectedRefundDetail,
    //         montant: selectedRefundMontant
    //     };
    //     await dispatch(editRefund(refund._id, refundData) as any);
    //     // Mettez à jour les données de l'interface utilisateur
    // };

    // // Fonction pour supprimer un remboursement
    // const handleDeleteRefund = async (refundId: any) => {
    //     await dispatch(deleteRefund(refund._id, refundId) as any);
    //     // Mettez à jour les données de l'interface utilisateur
    // };
    return <>
        <div className="w-full h-auto relative">

            <h2 className="text-5xl font-thin mb-9">Remboursement</h2>
            <div className="absolute top-0 flex flex-row gap-2 w-full">
                <Link to={`/${first}/${second}/${third}`}>
                    <CircleArrowLeft className="hover:scale-125 ease-in-out duration-300" />
                </Link>
            </div>
        </div >

        <section className="grid grid-cols-5 gap-4">
            {refunds.map((refund: any) => (
                <Link to={`./${refund._id}`} className="min-h-40 w-full flex-col bg-zinc-900 flex items-center rounded-2xl py-8 transition-all hover:bg-opacity-80 hover:scale-95">
                    <p>{refund.titre}</p>
                    <p>{formatDate(refund.date)}</p>
                    <p>{refund.detail}</p>
                    <p>{separateMillier(refund.montant)} €</p>
                </Link>
            ))}
        </section >
    </>
}