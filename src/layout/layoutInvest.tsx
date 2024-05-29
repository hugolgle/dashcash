import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function LayoutInvest() {

    return <>
        <div className="w-full relative">
            <h2 className="text-5xl font-thin mb-9">Investissements</h2>
            <Link to="add" className='absolute  top-0 flex flex-row justify-between'>
                <CirclePlus className="hover:scale-125 ease-in-out duration-300" />
            </Link>
        </div>

        <section className="flex flex-col gap-4">
            <div className="flex flex-row w-full h-64 gap-4">

                <Link to="operations" className="flex flex-col hover:scale-95 justify-between w-3/5 bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-4 gap-4 cursor-pointer">
                    <div className="flex flex-col w-full gap-4">
                        <p className="text-4xl">Investissement en cours</p>
                        <p>Montant</p>
                    </div>
                </Link>
                <Link to="operations" className="w-2/5 h-32 bg-zinc-900 rounded-2xl hover:bg-opacity-80 hover:scale-95  transition-all p-2">
                    <h3 className="text-4xl">Mes investissements</h3>
                </Link>
            </div>
        </section>
    </>
}