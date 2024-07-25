import { getLastTransactionsByType } from "../../utils/operations";
import { calculEconomie, calculTotalByMonth } from "../../utils/calcul";
import { infoUser } from "../../utils/users";
import { addSpace, convertDate, convertirFormatDate } from "../../utils/fonctionnel";
import { Camembert } from "../../components/Charts/camembert";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Graphique } from "../../components/Charts/graphique";
import { categorieDepense } from '../../../public/categories.json'
import { getLastSixMonths } from "../../utils/autre";

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

  const lastTransactions = getLastTransactionsByType(null, userInfo.id, 5)

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

  const montantEpargne = parseFloat(montantRecettesLastMonth) - parseFloat(montantTotalLoisirDf);

  const [graphMonth, setGraphMonth] = useState(currentDate)


  const clickNextMonthGraph = () => {
    let yearNum = parseInt(graphMonth.slice(0, 4), 10);
    let monthNum = parseInt(graphMonth.slice(4), 10);
    monthNum += 1;
    if (monthNum === 13) {
      monthNum = 1;
      yearNum += 1;
    }
    const newMonth = monthNum.toString().padStart(2, '0');
    const newDate = `${yearNum}${newMonth}`;
    setGraphMonth(newDate);
  };

  const clickLastMonthGraph = () => {
    let yearNum = parseInt(graphMonth.slice(0, 4), 10);
    let monthNum = parseInt(graphMonth.slice(4), 10);
    monthNum -= 1;
    if (monthNum === 0) {
      monthNum = 12;
      yearNum -= 1;
    }
    const newMonth = monthNum.toString().padStart(2, '0');
    const newDate = `${yearNum}${newMonth}`;
    setGraphMonth(newDate);
  };

  // Obtenir les 6 derniers mois et leurs montants
  const lastSixMonths = getLastSixMonths(graphMonth);

  const montantDepenseByMonth: any = [];
  const montantRecetteByMonth: any = [];

  lastSixMonths.forEach(({ code }) => {
    const montantDepenses = calculTotalByMonth("Dépense", code, userInfo.id, null);
    const montantRecettes = calculTotalByMonth("Recette", code, userInfo.id, null);

    montantDepenseByMonth.push(formatData(montantDepenses));
    montantRecetteByMonth.push(formatData(montantRecettes));
  });

  // Préparer les données pour le graphique
  const dataGraph = lastSixMonths.map((monthData, index) => ({
    month: monthData.month,
    year: monthData.year,
    montantDepense: montantDepenseByMonth[index],
    montantRecette: montantRecetteByMonth[index],
  }));

  const firstMonth = lastSixMonths[0]

  const lastMonth = lastSixMonths[lastSixMonths.length - 1]

  return (
    <>
      <section className="w-full h-full">
        <h2 className="text-5xl font-thin mb-5">Tableau de bord</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 h-full">
            <div className="w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 flex flex-col gap-4">
              <h2 className="text-3xl font-extralight italic">Mois en cours</h2>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex flex-row gap-4 h-1/2">
                  <div className="flex flex-col w-full h-full bg-green-600 py-3 rounded bg-opacity-15 items-center justify-center">
                    <p>Recettes</p>
                    <p className="font-bold">{montantRecettesMonth}</p>
                  </div>
                  <div className="flex flex-col w-full h-full bg-red-600 py-3 rounded bg-opacity-15 items-center justify-center">
                    <p>Dépenses</p>
                    <p className="font-bold">{montantDepensesMonth}</p>
                  </div>
                </div>
                <div className="flex flex-row gap-4 h-1/2">
                  <div className="flex flex-col  w-full h-full bg-zinc-600 py-3 rounded bg-opacity-15 items-center justify-center">
                    <p>Économie</p>
                    <p className="font-bold">{economiesCurrentMonth} €</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 flex flex-col gap-4">
              <h2 className="text-3xl font-extralight italic">Mois dernier</h2>
              <div className="flex flex-col gap-4 h-full">
                <div className="flex flex-row gap-4 h-1/2">
                  <div className="flex flex-col w-full h-full bg-green-600 py-3 rounded bg-opacity-15 items-center justify-center">
                    <p>Recettes</p>
                    <p className="font-bold">{montantRecettesLastMonth}</p>
                  </div>
                  <div className="flex flex-col w-full h-full bg-red-600 py-3 rounded bg-opacity-15 items-center justify-center">
                    <p>Dépenses</p>
                    <p className="font-bold">{montantDepensesLastMonth}</p>
                  </div>
                </div>
                <div className="flex flex-row gap-4 h-1/2">
                  <div className="flex flex-col w-full h-full bg-zinc-600 py-3 rounded bg-opacity-15 items-center justify-center">
                    <p>Économie</p>
                    <p className="font-bold">{economieLastMonth} €</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl p-4 flex flex-col gap-4">
              <h2 className="text-3xl font-extralight italic">Dernières transactions</h2>
              <table className="h-full">
                <tbody className="w-full h-full flex flex-col gap-2">
                  {lastTransactions.map((transaction: any) => (
                    <tr
                      key={transaction._id}
                      className={`bg-opacity-15 rounded h-full flex flex-row items-center py-1 text-sm ${transaction.type === "Recette" ? "bg-green-600" : transaction.type === "Dépense" ? "bg-red-600" : ""}`}>
                      <td className="w-full">{convertirFormatDate(transaction.date)}</td>
                      <td className="w-full">{transaction.titre}</td>
                      <td className="w-full">{transaction.categorie}</td>
                      <td className="w-full"><b>{addSpace(transaction.montant)} €</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-row gap-4 h-full">
            <div className="w-5/12 bg-zinc-100  dark:bg-zinc-900 rounded-xl p-4">
              <h2 className="text-3xl font-extralight italic">Répartitions</h2>
              <div className="flex flex-row justify-between w-full py-3 px-32">
                <ChevronLeft size={20} onClick={clickLastMonth} className="cursor-pointer hover:scale-95 transition-all" />
                <p className="font-thin italic">{convertDate(month)}</p>
                <ChevronRight
                  size={20}
                  onClick={clickNextMonth}
                  className={`cursor-pointer hover:scale-95 transition-all ${month >= currentDate ? "invisible" : ""}`}
                />
              </div>
              <Camembert dataDf={formatData(dataDf)} dataLoisir={formatData(dataLoisir)} dataEpargne={montantEpargne} total={formatData(total)} />
              <div className="flex flex-row justify-evenly w-full mt-2">
                <div className="flex flex-row justify-center items-center">
                  <div className="w-3 h-3 rounded bg-colorChart2"></div>
                  <p className="ml-2 font-thin text-sm">Dépenses fixes</p>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <div className="w-3 h-3 rounded bg-colorChart1"></div>
                  <p className="ml-2 font-thin text-sm">Dépenses loisirs</p>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <div className="w-3 h-3 rounded bg-colorChart3"></div>
                  <p className="ml-2 font-thin text-sm">Épargne</p>
                </div>

              </div>
            </div>
            <div className="w-7/12 bg-zinc-100 dark:bg-zinc-900 rounded-xl h-full p-4 relative">
              <h2 className="text-3xl font-extralight italic">Graphique</h2>
              <Graphique data={dataGraph} />
              <div className={`flex flex-row gap-4 w-full px-40 justify-between bottom-2`}>
                <ChevronLeft className='cursor-pointer hover:scale-90 transition-all' onClick={clickLastMonthGraph} />
                <p className="text-sm italic">{firstMonth.month} {firstMonth.year} - {lastMonth.month} {lastMonth.year}</p>
                <ChevronRight className='cursor-pointer hover:scale-90 transition-all' onClick={clickNextMonthGraph} />
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
