import { CirclePlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Path from "../utils/utils";
export default function Layout(props: any) {

    const location = useLocation()
    const lUrl = Path(location)

    return <>
        <div className="w-full relative">
            <h2 className="text-5xl font-thin mb-9">{props.type}</h2>
            <Link to={`/${lUrl}/add`} className='absolute top-0 flex flex-row justify-between w-full'>
                <CirclePlus className="hover:scale-125 ease-in-out duration-300" />
            </Link>
        </div>

        <section className=" flex flex-col gap-4">

            <div className="flex flex-row gap-4  w-full text-left">
                <Link to="202401" className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2 gap-4 cursor-pointer">
                    <p>Janvier</p>
                    <p className="text-4xl">1 000.00€</p>
                </Link>
                <Link to="202402" className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2 gap-4 cursor-pointer">
                    <p>Février</p>
                    <p className="text-4xl">1 000.00€</p>
                </Link>
                <Link to="202403" className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2 gap-4 cursor-pointer">
                    <p>Mars</p>
                    <p className="text-4xl">1 000.00€</p>
                </Link>
            </div>


            <div className="flex flex-row-reverse w-full h-64 gap-4">
                <div className="bg-zinc-900 h-full w-3/5 rounded-2xl hover:bg-opacity-80 transition-all p-2">
                    <h1>Graphique</h1>
                </div>
                <div className="flex flex-col h-full w-2/5 gap-4">
                    <div className="bg-zinc-900 w-full h-1/2 rounded-2xl hover:bg-opacity-80 transition-all p-2">

                    </div>
                    <div className="bg-zinc-900 w-full h-1/2 rounded-2xl hover:bg-opacity-80 transition-all p-2">

                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-4  w-full">
                <Link to="2023" className="w-1/2 h-32 bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2">
                    <p>2023</p>
                    <p className="text-4xl">1 000.00€</p>
                </Link>
                <Link to="2024" className="w-1/2  h-32 bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2">
                    <p>Cette année</p>
                    <p className="text-4xl">1 000.00€</p>
                </Link>
            </div>
            <Link to="all" className="w-full  h-32 bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2">
                <p>Depuis le début</p>
                <p className="text-4xl">1 000.00€</p>
            </Link>
        </section>
    </>

}
