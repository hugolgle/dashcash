
import { Link, useLocation } from 'react-router-dom'
import { CircleArrowLeft, CirclePlus } from 'lucide-react';
import Path from '../../utils/utils';
import Tableau from '../../components/Tableau/tableau';


export default function PageTransactions(props: any) {

    const location = useLocation()
    const lUrl = Path(location)

    return <>
        <div className="w-full">
            <h2 className="text-5xl font-thin mb-9">{props.title}</h2>
            <Link to={`/${lUrl}/add`}>
                <CirclePlus className="absolute top-4 right-4 cursor-pointer hover:scale-125 ease-in-out duration-300" />
            </Link>
            <Link to={`/${lUrl}`}>
                <CircleArrowLeft className="absolute top-4 cursor-pointer hover:scale-125 ease-in-out duration-300" />
            </Link>
        </div>
        <Tableau />
    </>
}