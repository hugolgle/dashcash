import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CircleArrowLeft, CirclePlus, SlidersHorizontal } from 'lucide-react';
import { Path, convertDate } from '../../utils/fonctionnel'
import { calculTotalByMonth, calculTotal, calculTotalByYear } from '../../utils/calcul'
import { getOperationsByYear, getOperationsByMonth, getOperationsByType, } from '../../utils/operations'
import Tableau from '../../components/Tableau/tableau';

export default function PageOperations(props: any) {
    const location = useLocation();
    const lUrl = Path(location, 1);

    const [transactionDeleted, setTransactionDeleted] = useState(false);


    useEffect(() => {
        const isTransactionDeleted = localStorage.getItem('transactionDeleted') === 'true';

        if (isTransactionDeleted) {
            setTransactionDeleted(true);

            const timeout = setTimeout(() => {
                localStorage.removeItem('transactionDeleted');
                setTransactionDeleted(false);
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, []);

    const { date } = useParams();
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        function handleScroll() {
            const scrollTop = document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight;
            const bottomOffset = scrollHeight - (scrollTop + windowHeight);

            if (bottomOffset < 20) {
                setIsBottom(true);
            } else {
                setIsBottom(false);
            }

        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                date === "all" ? getOperationsByType(props.type) :
                    date?.length === 4 ? getOperationsByYear(date, props.type) :
                        getOperationsByMonth(date, props.type)
            } />
            <div className="fixed w-44 bottom-10 right-0 rounded-l-xl shadow-2xl shadow-black bg-zinc-800 py-3 transition-all">
                Total : <b>{
                    date === "all" ? calculTotal(props.type) :
                        date && date.length === 4 ? calculTotalByYear(props.type, date) :
                            date ? calculTotalByMonth(props.type, date) : "Date non définie"
                }</b>
                <br />
                Transaction(s) : <b>{
                    date === "all" ? getOperationsByType(props.type).length :
                        date?.length === 4 ? getOperationsByYear(date, props.type).length :
                            getOperationsByMonth(date, props.type).length
                }</b>
            </div>
            {transactionDeleted ? (
                <div className={`absolute bottom-4 right-4 flex justify-center transition-all items-center animate-[fadeIn_0.3s_ease-in-out_forwards]`}>
                    <p className="p-4 bg-red-900 max-w-60 rounded shadow-2xl shadow-black">
                        Votre transaction a été supprimé avec succès
                    </p>
                </div>
            ) : null}
        </>
    );
}