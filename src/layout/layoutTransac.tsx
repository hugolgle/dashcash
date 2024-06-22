import { CirclePlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { calculTotal, calculTotalByMonth, calculTotalByYear } from "../utils/calcul";
import { Path, addSpace, convertirFormatDate, } from "../utils/fonctionnel";
import { getCurrentMonth, getLastFiveTransactionsByType } from "../utils/operations";
import { getLastThreeMonthsOfCurrentYear, getLastTwoYears, premierJourMoisEnCours } from "../utils/autre";
import { infoUser } from "../utils/users";
export default function LayoutTransac(props: any) {

    const userInfo = infoUser()

    const lastMonths = getLastThreeMonthsOfCurrentYear()
    const lastYears = getLastTwoYears()
    const currentMonth = getCurrentMonth()
    const lastTransactions = getLastFiveTransactionsByType(props.type, userInfo.id)
    const firstDayMonth = premierJourMoisEnCours()

    return <>
        <div className="w-full relative">
            <h2 className="text-5xl font-thin mb-9">{props.type}s</h2>
            <Link to="add" className='absolute  top-0 flex flex-row justify-between'>
                <CirclePlus className="hover:scale-125 ease-in-out duration-300" />
            </Link>
        </div>

        <section className="flex flex-col gap-4">
            <div className="flex flex-row w-full h-64 gap-4">

                <Link to={currentMonth} className="flex flex-col hover:scale-95 justify-between w-3/5 bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-4 gap-4 cursor-pointer">
                    <div className="flex flex-col w-full gap-4">
                        <p className="text-4xl">{calculTotalByMonth(props.type, currentMonth, userInfo.id)}</p>

                        {lastTransactions && lastTransactions.length > 0 ? (
                            <table>
                                <tbody>
                                    {lastTransactions.map((transaction: any) => (
                                        <tr key={transaction._id}>
                                            <td>{convertirFormatDate(transaction.date)}</td>
                                            <td>{transaction.titre}</td>
                                            <td>{transaction.categorie === "Autre" ? transaction.autreCategorie : transaction.categorie}</td>
                                            <td><b>{addSpace(transaction.montant)} €</b></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="italic">Aucune {props.type} ce mois-ci !</p>
                        )}

                    </div>

                    <p className="text-right italic">Depuis le {firstDayMonth}</p>
                </Link>
                <div className="flex flex-col-reverse gap-4 w-2/5 text-left">
                    {lastMonths.map((month: any) => (
                        <Link key={month.code} to={month.code} className="flex flex-col-reverse hover:scale-95 justify-between w-full h-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-4 gap-4 cursor-pointer">
                            <p className="text-right italic">{month.month}</p>
                            <p className="text-4xl">{calculTotalByMonth(props.type, month.code, userInfo.id)}</p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex flex-row gap-4 w-full">
                {lastYears.map((year: any) => (
                    <Link key={year} to={`${year}`} className="w-1/2 h-32 bg-zinc-900 rounded-2xl hover:bg-opacity-80 hover:scale-95 transition-all p-2">
                        <p className="italic">{year}</p>
                        <p className="text-4xl">{calculTotalByYear(props.type, `${year}`, userInfo.id)}</p>
                    </Link>
                ))}
            </div>

            <Link to="all" className="w-full  h-32 bg-zinc-900 rounded-2xl hover:bg-opacity-80 hover:scale-95  transition-all p-2">
                <p className="italic">Depuis le début</p>
                <p className="text-4xl">{calculTotal(props.type, userInfo.id)}</p>
            </Link>
        </section >
    </>
}