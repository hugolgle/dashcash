import { Link, useParams } from "react-router-dom";
import { formatDate, separateMillier } from "../utils/fonctionnel";
import { getRefundsByTransactionId } from "../utils/operations";
import { useEffect, useState } from "react";
import { infoUser } from "../utils/users";
import BtnReturn from "../components/button/btnReturn";


export default function LayoutRefund() {

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
    const refunds = getRefundsByTransactionId(id)

    return <>
        <section>
            <div className="w-full h-auto relative">

                <h2 className="  text-5xl font-thin mb-5">Remboursement</h2>
                <div className="absolute top-0 flex flex-row gap-2 w-full">
                    <BtnReturn />
                </div>
            </div >

            <div className="grid grid-cols-5 gap-4">
                {refunds.map((refund: any) => (
                    <Link to={`./${refund._id}`} className="min-h-40 w-full flex-col bg-zinc-100 dark:bg-zinc-900 flex items-center rounded-2xl py-8 transition-all hover:bg-opacity-80 hover:scale-95">
                        <p>{refund.titre}</p>
                        <p>{formatDate(refund.date)}</p>
                        <p>{refund.detail}</p>
                        <p>{separateMillier(refund.montant)} €</p>
                    </Link>
                ))}
            </div >
        </section>
    </>
}