
import { Link, useLocation, useParams } from 'react-router-dom'
import { CircleArrowLeft, CirclePlus, SlidersHorizontal } from 'lucide-react';
import Path, { convertDate, getOperationsByYear, getOperationsByMonth, getOperationsByType, calculTotalByMonth, calculTotal, calculTotalByYear } from '../../utils/utils';
import Tableau from '../../components/Tableau/tableau';

export default function PageOperations(props: any) {

    const location = useLocation()
    const lUrl = Path(location)

    const { date } = useParams()

    return <>
        <div className="w-full relative">
            <h2 className="text-5xl font-thin mb-9">{props.type}s de {date === "all" ? "tout temps" : date?.length === 4 ? date : convertDate(date)}</h2>
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
        <Tableau operations={
            date === "all" ? getOperationsByType(props.type) :
                date?.length === 4 ? getOperationsByYear(date, props.type) :
                    getOperationsByMonth(date, props.type)
        } />
        <div className='fixed bottom-0 w-1/5 right-96 mr-16 rounded-t-xl bg-zinc-800 py-3'>
            Total : <b>{
                date === "all" ? calculTotal(props.type) :
                    date && date.length === 4 ? calculTotalByYear(props.type, date) :
                        date ? calculTotalByMonth(props.type, date) : "Date non définie"
            }</b>
        </div>
    </>
}