import { Link, useLocation } from 'react-router-dom';
import { CircleArrowLeft, CirclePlus, SlidersHorizontal } from 'lucide-react';
import { Path } from '../../utils/fonctionnel'
import { infoUser } from '../../utils/users';
import { getAllInvestments } from '../../utils/operations';
import TableauInvest from '../../components/Tableau/tableauInvest';
import { calculTotalInvestment } from '../../utils/calcul';

export default function PageInvestment(props: any) {

    const userInfo = infoUser()

    const location = useLocation();
    const lUrl = Path(location, 1);


    // _________________________

    return (
        <>
            <div className="w-full relative">
                <h2 className="text-5xl font-thin mb-9">Investissements</h2>
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

            <TableauInvest investments={getAllInvestments(userInfo.id, props.sold)} sold={props.sold} />
            <div className="fixed w-44 bottom-10 right-0 rounded-l-xl shadow-2xl shadow-black bg-zinc-800 py-3 transition-all">
                Total : <b>{calculTotalInvestment(userInfo.id, props.sold)}</b>
                <br />
                Transaction(s) : <b>{getAllInvestments(userInfo.id, props.sold).length}</b>
            </div>


        </>
    );
}