import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertDate } from '../../utils/fonctionnel'
import { calculTotalByMonth, calculTotal, calculTotalByYear } from '../../utils/calcul'
import { getTransactionsByYear, getTransactionsByMonth, getTransactionsByType } from '../../utils/operations'
import TableauTransac from '../../components/Tableau/tableauTransac';
import { infoUser } from '../../utils/users';
import BtnReturn from '../../components/button/btnReturn';
import BtnAdd from '../../components/button/btnAdd';
import { ListCollapse } from 'lucide-react';

export default function PageTransactions(props: any) {

    const userInfo = infoUser()

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

    const typeProps = props.type === "Dépense" ? "depense" : props.type === "Recette" ? "recette" : undefined;

    const [selectOpe, setSelectOpe] = useState(false)

    const handleSelectOpe = () => {
        setSelectOpe(!selectOpe);
    };


    // _________________________

    return (
        <>
            <div className="w-full relative">
                <h2 className="text-5xl font-thin mb-9">{props.type}s de {date === "all" ? "tout temps" : date?.length === 4 ? date : convertDate(date)}</h2>
                <div className='absolute top-0 flex flex-row w-full gap-2'>
                    <BtnReturn />
                    <BtnAdd to={`/${typeProps}`} />
                    <ListCollapse className={`cursor-pointer hover:scale-110 transition-all ${selectOpe ? "text-zinc-500" : ""}`} onClick={handleSelectOpe} />
                </div>
            </div >
            <TableauTransac transactions={
                date === "all" ? getTransactionsByType(props.type, userInfo.id) :
                    date?.length === 4 ? getTransactionsByYear(date, props.type, userInfo.id) :
                        getTransactionsByMonth(date, props.type, userInfo.id)
            } selectOpe={selectOpe} />
            <div className="fixed w-44 bottom-10 right-0 rounded-l-xl shadow-2xl shadow-black bg-zinc-800 py-3 transition-all">
                Total : <b>{
                    date === "all" ? calculTotal(props.type, userInfo.id) :
                        date && date.length === 4 ? calculTotalByYear(props.type, date, userInfo.id) :
                            date ? calculTotalByMonth(props.type, date, userInfo.id) : "Date non définie"
                }</b>
                <br />
                Transaction(s) : <b>{
                    date === "all" ? getTransactionsByType(props.type, userInfo.id).length :
                        date?.length === 4 ? getTransactionsByYear(date, props.type, userInfo.id).length :
                            getTransactionsByMonth(date, props.type, userInfo.id).length
                }</b>
            </div>
            {
                transactionDeleted ? (
                    <div className={`absolute bottom-4 right-4 flex justify-center transition-all items-center animate-[fadeIn_7s_ease-in-out_forwards]`}>
                        <p className="p-4 bg-red-900 max-w-60 rounded shadow-2xl shadow-black">
                            Votre transaction a été supprimé avec succès
                        </p>
                    </div>
                ) : null
            }
        </>
    );
}