import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CircleArrowLeft, CirclePlus, SlidersHorizontal } from 'lucide-react';
import { Path, convertDate } from '../../utils/fonctionnel'
import { calculTotalByMonth, calculTotal, calculTotalByYear } from '../../utils/calcul'
import { getOperationsByYear, getOperationsByMonth, getOperationsByType } from '../../utils/operations'
import Tableau from '../../components/Tableau/tableau';
import { infoUser } from '../../utils/users';

export default function PageOperations(props: any) {

    const userInfo = infoUser()

    const location = useLocation();
    const lUrl = Path(location, 1);

    const [transactionDeleted, setTransactionDeleted] = useState(false);

    useEffect(() => {
        const isTransactionDeleted = localStorage.getItem('transactionDeleted') === 'true';

        if (isTransactionDeleted) {
            setTransactionDeleted(true);

            localStorage.removeItem('transactionDeleted');
            const timeout = setTimeout(() => {
                setTransactionDeleted(false);
            }, 7000);

            return () => clearTimeout(timeout);
        }
    }, []);

    const { date } = useParams();


    // _________________________

    return (
        <>
            <div className="w-full relative">
                <h2 className="text-5xl font-thin mb-9">{props.type}s de {date === "all" ? "tout temps" : date?.length === 4 ? date : convertDate(date)}</h2>
                <div className='absolute top-0 flex flex-row w-full gap-2'>

                    <Link to={`/${lUrl}`}>
                        <CircleArrowLeft className="hover:scale-125 ease-in-out duration-300" />
                    </Link>
                    <Link to={`/${lUrl}/add`}>
                        <CirclePlus className="hover:scale-125 ease-in-out duration-300" />
                    </Link>

                    <Link to={`/${lUrl}`}>
                        <SlidersHorizontal className=" hover:scale-125 ease-in-out duration-300" />
                    </Link>
                </div>
            </div>
            <Tableau operations={
                date === "all" ? getOperationsByType(props.type, userInfo.id) :
                    date?.length === 4 ? getOperationsByYear(date, props.type, userInfo.id) :
                        getOperationsByMonth(date, props.type, userInfo.id)
            } />
            <div className="fixed w-44 bottom-10 right-0 rounded-l-xl shadow-2xl shadow-black bg-zinc-800 py-3 transition-all">
                Total : <b>{
                    date === "all" ? calculTotal(props.type, userInfo.id) :
                        date && date.length === 4 ? calculTotalByYear(props.type, date, userInfo.id) :
                            date ? calculTotalByMonth(props.type, date, userInfo.id) : "Date non définie"
                }</b>
                <br />
                Transaction(s) : <b>{
                    date === "all" ? getOperationsByType(props.type, userInfo.id).length :
                        date?.length === 4 ? getOperationsByYear(date, props.type, userInfo.id).length :
                            getOperationsByMonth(date, props.type, userInfo.id).length
                }</b>
            </div>
            {transactionDeleted ? (
                <div className={`absolute bottom-4 right-4 flex justify-center transition-all items-center animate-[fadeIn_7s_ease-in-out_forwards]`}>
                    <p className="p-4 bg-red-900 max-w-60 rounded shadow-2xl shadow-black">
                        Votre transaction a été supprimé avec succès
                    </p>
                </div>
            ) : null}
        </>
    );
}