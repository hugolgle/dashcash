import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { infoUser } from "../utils/users";
import BtnAdd from "../components/button/btnAdd";
import { separateMillier } from "../utils/fonctionnel";
import { getSubscriptions } from "../utils/operations";


export default function LayoutAbonnement() {
    const userInfo = infoUser()
    const abonnements = getSubscriptions(userInfo.id)

    return <>

        <section className="w-full h-auto relative">
            <h2 className="text-5xl font-thin mb-9">Mes abonnements</h2>
            <div className='absolute top-0 flex flex-row w-full gap-2'>
                <BtnAdd />
            </div>
            <div className="grid grid-cols-5 gap-4">
                {abonnements.map((abonnement: any) => (
                    <Link to={`./${abonnement._id}`} className="min-h-40 w-full flex-col bg-zinc-100 dark:bg-zinc-900 flex items-center rounded-2xl py-8 transition-all hover:bg-opacity-80 hover:scale-95">
                        <p>{abonnement.titre}</p>
                        <p>{abonnement.detail}</p>
                        <p>{abonnement.montant} €</p>
                        <p>{abonnement.recurrence}</p>
                    </Link>
                ))}
            </div >
        </section>
    </>
}