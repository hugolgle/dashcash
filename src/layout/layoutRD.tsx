import { Link } from "react-router-dom";

export default function LayoutRD() {

    return <>
        <section className=" flex flex-col gap-4">

            <div className="flex flex-row gap-4  w-full text-left">
                <Link to="janvier" className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:opacity-80 transition-all p-2 gap-4 cursor-pointer">
                    <p>Janvier</p>
                    <p className="text-4xl">1 000.00€</p>
                </Link>
                <Link to="fevrier" className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:opacity-80 transition-all p-2 gap-4 cursor-pointer">
                    <p>Février</p>
                    <p className="text-4xl">1 000.00€</p>
                </Link>
                <Link to="mars" className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:opacity-80 transition-all p-2 gap-4 cursor-pointer">
                    <p>Mars</p>
                    <p className="text-4xl">1 000.00€</p>
                </Link>
            </div>


            <div className="flex flex-row-reverse w-full h-64 gap-4">
                <div className="bg-zinc-900 h-full w-3/5 rounded-2xl hover:opacity-80 transition-all p-2">

                </div>
                <div className="flex flex-col h-full w-2/5 gap-4">
                    <div className="bg-zinc-900 w-full h-1/2 rounded-2xl hover:opacity-80 transition-all p-2">

                    </div>
                    <div className="bg-zinc-900 w-full h-1/2 rounded-2xl hover:opacity-80 transition-all p-2">

                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-4  w-full">
                <div className="w-full h-44 bg-zinc-900 rounded-2xl hover:opacity-80 transition-all p-2">
                    <p>Moyenne recette</p>
                    <p className="text-4xl">1 000.00€</p>
                </div>
                <div className="w-5/6 h-44 bg-zinc-900 rounded-2xl hover:opacity-80 transition-all p-2">
                    <p>Moyenne recette</p>
                    <p className="text-4xl">1 000.00€</p>
                </div>
            </div>
        </section>
    </>

}
