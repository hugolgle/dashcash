import { infoUser } from '../../utils/users';
import { getAllInvestments } from '../../utils/operations';
import TableauInvest from '../../components/Tableau/tableauInvest';
import { calculTotalInvestment } from '../../utils/calcul';
import BtnReturn from '../../components/button/btnReturn';
import BtnAdd from '../../components/button/btnAdd';

export default function PageInvestment(props: any) {

    const userInfo = infoUser()


    // _________________________

    return (
        <>
            <section className="w-full relative py-4">
                <h2 className="  text-5xl font-thin mb-5">Investissements</h2>
                <div className='absolute top-0 flex flex-row w-full gap-2'>
                    <BtnReturn />
                    <BtnAdd to="/invest" />
                </div>

                <TableauInvest investments={getAllInvestments(userInfo.id, props.sold)} sold={props.sold} />
                <div className="fixed w-44 bottom-10 right-0 rounded-l-xl shadow-2xl shadow-black bg-zinc-200 dark:bg-zinc-800 py-3 transition-all">
                    Total : <b>{calculTotalInvestment(userInfo.id, props.sold)}</b>
                    <br />
                    Transaction(s) : <b>{getAllInvestments(userInfo.id, props.sold).length}</b>
                </div>
            </section>


        </>
    );
}