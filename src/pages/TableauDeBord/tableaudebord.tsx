import { getLastFiveTransactionsByType } from "../../utils/operations";
import { calculEconomie, calculTotalByMonth } from "../../utils/calcul";
import { infoUser } from "../../utils/users";
import { addSpace, convertDate, convertirFormatDate } from "../../utils/fonctionnel";
import { Camembert } from "../../components/Charts/camembert";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useState } from "react";
import { Graphique } from "../../components/Charts/graphique";
import { categorieDepense } from '../../../public/categories.json'

export default function TableauDeBord() {

  const userInfo = infoUser();

  const getCurrentMonthAndYear = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    return { month: currentMonth, year: currentYear };
  };

  const { month: currentMonth, year: currentYear } = getCurrentMonthAndYear();

  const newCurrentMonth = String(currentMonth).padStart(2, '0');
  const currentDate = `${currentYear}${newCurrentMonth}`;

  const montantRecettesMonth = calculTotalByMonth("Recette", currentDate, userInfo.id, null);
  const montantDepensesMonth = calculTotalByMonth("Dépense", currentDate, userInfo.id, null);

  const getPreviousMonthAndYear = (month: number, year: number) => {
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth === 0) {
      prevMonth = 12;
      prevYear -= 1;
    }
    return { month: prevMonth, year: prevYear };
  };

  const { month: previousMonth, year: previousYear } = getPreviousMonthAndYear(currentMonth, currentYear);

  const newPreviousMonth = String(previousMonth).padStart(2, '0');
  const previousDate = `${previousYear}${newPreviousMonth}`;

  const montantRecettesLastMonth = calculTotalByMonth("Recette", previousDate, userInfo.id, null);
  const montantDepensesLastMonth = calculTotalByMonth("Dépense", previousDate, userInfo.id, null);

  const economiesCurrentMonth = calculEconomie(`${currentYear}`, newCurrentMonth, userInfo.id);

  const economieLastMonth = calculEconomie(`${previousYear}`, newPreviousMonth, userInfo.id);

  const lastTransactions = getLastFiveTransactionsByType(null, userInfo.id)

  const formatData = (data: string) => {
    const cleanedData = data.replace(/[^\d.-]/g, '').replace(/ /g, '');
    const absoluteValue = Math.abs(parseFloat(cleanedData));

    return absoluteValue.toFixed(2);
  }

  const [month, setMonth] = useState(currentDate)

  const clickLastMonth = () => {
    let yearNum = parseInt(month.slice(0, 4), 10);
    let monthNum = parseInt(month.slice(4), 10);
    monthNum -= 1;
    if (monthNum === 0) {
      monthNum = 12;
      yearNum -= 1;
    }
    const newMonth = monthNum.toString().padStart(2, '0');
    const newDate = `${yearNum}${newMonth}`;
    setMonth(newDate);
  };

  const clickNextMonth = () => {
    let yearNum = parseInt(month.slice(0, 4), 10);
    let monthNum = parseInt(month.slice(4), 10);

    monthNum += 1;

    if (monthNum === 13) {
      monthNum = 1;
      yearNum += 1;
    }

    const newMonth = monthNum.toString().padStart(2, '0');

    const newDate = `${yearNum}${newMonth}`;
    setMonth(newDate);
  };

  const categoriesDf = categorieDepense.map((categorie: any) => {
    if (categorie.categorie === "Fixe") {
      return categorie.name;
    }
  });

  const categoriesLoisir = categorieDepense.map((categorie: any) => {
    if (categorie.categorie === "Loisir") {
      return categorie.name;
    }
  });

  const dataDf = calculTotalByMonth("Dépense", month, userInfo.id, categoriesDf);
  const dataLoisir = calculTotalByMonth("Dépense", month, userInfo.id, categoriesLoisir);

  const montantTotalLoisirDf = formatData(dataDf) + formatData(dataLoisir);

  const total = calculTotalByMonth("Recette", month, userInfo.id, null)
  console.log(total)

  const montantEpargne = parseFloat(montantRecettesLastMonth) - parseFloat(montantTotalLoisirDf);

  return (
    <>
      <h2 className="text-5xl font-thin mb-9">Tableau de bord</h2>
      <section className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="w-2/3 bg-zinc-900 rounded-xl h-fit p-4 flex flex-col gap-4">
            <h2 className="text-3xl font-extralight italic">Mois en cours</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col text-center w-full bg-green-600 py-3 rounded bg-opacity-15">
                  <p>Recettes</p>
                  <p className="font-bold">{montantRecettesMonth}</p>
                </div>
                <div className="flex flex-col text-center w-full bg-red-600 py-3 rounded bg-opacity-15">
                  <p>Dépenses</p>
                  <p className="font-bold">{montantDepensesMonth}</p>
                </div>
              </div>
              <div className="flex flex-col text-center w-full bg-slate-600 py-3 rounded bg-opacity-15">
                <p>Économie</p>
                <p className="font-bold">{economiesCurrentMonth} €</p>
              </div>
            </div>
          </div>
          <div className="w-2/3 bg-zinc-900 rounded-xl h-fit p-4 flex flex-col gap-4">
            <h2 className="text-3xl font-extralight italic">Mois dernier</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col text-center w-full bg-green-600 py-3 rounded bg-opacity-15">
                  <p>Recettes</p>
                  <p className="font-bold">{montantRecettesLastMonth}</p>
                </div>
                <div className="flex flex-col text-center w-full bg-red-600 py-3 rounded bg-opacity-15">
                  <p>Dépenses</p>
                  <p className="font-bold">{montantDepensesLastMonth}</p>
                </div>
              </div>
              <div className="flex flex-col text-center w-full bg-slate-600 py-3 rounded bg-opacity-15">
                <p>Économie</p>
                <p className="font-bold">{economieLastMonth} €</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-zinc-900 rounded-xl h-full p-4 flex flex-col gap-4">
            <h2 className="text-3xl font-extralight italic">Dernières transactions</h2>
            <table className="h-full">
              <tbody className="w-full">
                {lastTransactions.map((transaction: any) => (
                  <tr
                    key={transaction._id}
                    className={`bg-opacity-15 rounded flex my-1 flex-row items-center py-1 ${transaction.type === "Recette" ? "bg-green-600" : transaction.type === "Dépense" ? "bg-red-600" : ""}`}>
                    <td className="w-full ">{convertirFormatDate(transaction.date)}</td>
                    <td className="w-full ">{transaction.titre}</td>
                    <td className="w-full ">{transaction.categorie === "Autre" ? transaction.autreCategorie : transaction.categorie}</td>
                    <td className="w-full"><b>{addSpace(transaction.montant)} €</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-row gap-4 h-full">
          <div className="w-2/5 bg-zinc-900 rounded-xl p-4">
            <h2 className="text-3xl font-extralight italic">Répartitions</h2>
            <div className="flex flex-row justify-between w-full py-3 px-10">
              <CircleArrowLeft size={20} onClick={clickLastMonth} className="cursor-pointer hover:scale-95 transition-all" />
              <p className="font-thin italic">{convertDate(month)}</p>
              <CircleArrowRight size={20} onClick={clickNextMonth} className={`cursor-pointer hover:scale-95 transition-all ${month >= currentDate ? "invisible" : ""}`} />
            </div>
            <Camembert dataDf={formatData(dataDf)} dataLoisir={formatData(dataLoisir)} dataEpargne={montantEpargne} total={formatData(total)} />
            <div className="flex flex-row justify-evenly w-full mt-2">
              <div className="flex flex-row justify-center items-center">
                <div className="w-3 h-3 rounded bg-colorChart1">

                </div>
                <p className="ml-2 font-thin text-sm">Dépenses loisirs</p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <div className="w-3 h-3 rounded bg-colorChart2">

                </div>
                <p className="ml-2 font-thin text-sm">Dépenses fixes</p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <div className="w-3 h-3 rounded bg-colorChart3">

                </div>
                <p className="ml-2 font-thin text-sm">Épargne</p>
              </div>

            </div>
          </div>
          <div className="w-3/5 bg-zinc-900 rounded-xl h-80 p-4">
            <h2 className="text-3xl font-extralight italic">Graphique</h2>
            <Graphique />
          </div>
        </div>
      </section>
    </>
  );
}
