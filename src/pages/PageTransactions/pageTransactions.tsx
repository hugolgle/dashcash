
import { Link, useLocation } from 'react-router-dom'
import { CircleArrowLeft, CirclePlus, SlidersHorizontal } from 'lucide-react';
import Path, { getAllOperations } from '../../utils/utils';
import Tableau from '../../components/Tableau/tableau';


export default function PageTransactions(props: any) {

    const location = useLocation()
    const lUrl = Path(location)

    return <>
        <div className="w-full relative">
            <h2 className="text-5xl font-thin mb-9">{props.title}</h2>
            <div className='absolute top-0 flex flex-row justify-between w-full'>
                <Link to={`/${lUrl}`}>
                    <CircleArrowLeft className="hover:scale-125 ease-in-out duration-300" />
                </Link>
                <div className='flex flex-row gap-2'>
                    <Link to={`/${lUrl}/add`}>
                        <CirclePlus className="hover:scale-125 ease-in-out duration-300" />
                    </Link>
                    <Link to={`/${lUrl}`}>
                        <SlidersHorizontal className=" hover:scale-125 ease-in-out duration-300" />
                    </Link>
                </div>
            </div>

        </div>
        <Tableau operations={getAllOperations()} />
    </>
}