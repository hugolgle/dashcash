import { Link } from "react-router-dom";
import { calculTotalInvestment } from "../utils/calcul";
import { infoUser } from "../utils/users";
import BtnAdd from "../components/button/btnAdd";

export default function LayoutInvest() {
    const userInfo = infoUser()
    return <>
        <div className="w-full relative">
            <h2 className="text-5xl font-thin mb-9">Investissements</h2>
            <div className='absolute  top-0 flex flex-row justify-between'>
                <BtnAdd />
            </div>
        </div>
        <section className="flex flex-col gap-4">
            <div className="flex flex-row w-full justify-center h-64 gap-4">
                <Link to="operationsC" className="flex flex-col w-full hover:scale-95 justify-between bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-4 gap-4 cursor-pointer">
                    <div className="flex flex-col w-full gap-4">
                        <p className="text-4xl">Investissement en cours</p>
                        <p className="text-4xl">{calculTotalInvestment(userInfo.id, false)}</p>
                    </div>
                </Link>
                <Link to="operationsVendu" className="flex flex-col w-full hover:scale-95 justify-between bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-4 gap-4 cursor-pointer">
                    <div className="flex flex-col w-full gap-4">
                        <p className="text-4xl">Investissement vendu</p>
                        <p className="text-4xl">{calculTotalInvestment(userInfo.id, true)}</p>
                    </div>
                </Link>
            </div>
            <Link to="operations" className="flex flex-col w-full hover:scale-95 justify-between bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-4 gap-4 cursor-pointer">
                <div className="flex flex-col w-full gap-4">
                    <p className="text-4xl">Investissement</p>
                    <p className="text-4xl">{calculTotalInvestment(userInfo.id, null)}</p>
                </div>
            </Link>
        </section>
    </>
}