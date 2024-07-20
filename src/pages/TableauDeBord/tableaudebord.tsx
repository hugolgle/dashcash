import { getAllTransactions, getLastFiveTransactionsByType, getTransactionsByMonth } from "../../utils/operations";
import { calculEconomie, calculTotalByMonth } from "../../utils/calcul";
import { infoUser } from "../../utils/users";
import { addSpace, convertDate, convertirFormatDate } from "../../utils/fonctionnel";
import { Camembert } from "../../components/Charts/camembert";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useState } from "react";

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

  const formatData = (data: any) => {
    const newData = Math.abs(parseFloat(data));

    return `${newData.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`;
  }

  console.log(currentDate)

  const [month, setMonth] = useState(currentDate)

  const clickLastMonth = () => {
    // Extraire l'année et le mois
    let yearNum = parseInt(month.slice(0, 4), 10);
    let monthNum = parseInt(month.slice(4), 10);

    // Décrémenter le mois
    monthNum -= 1;

    // Si le mois est 0, le remettre à 12 et décrémenter l'année
    if (monthNum === 0) {
      monthNum = 12;
      yearNum -= 1;
    }

    // Formater le mois avec deux chiffres
    const newMonth = monthNum.toString().padStart(2, '0');

    // Formater la nouvelle date et mettre à jour l'état
    const newDate = `${yearNum}${newMonth}`;
    setMonth(newDate);
  };

  const clickNextMonth = () => {
    // Extraire l'année et le mois
    let yearNum = parseInt(month.slice(0, 4), 10);
    let monthNum = parseInt(month.slice(4), 10);

    // Incrémenter le mois
    monthNum += 1;

    // Si le mois est 13, le remettre à 1 et incrémenter l'année
    if (monthNum === 13) {
      monthNum = 1;
      yearNum += 1;
    }

    // Formater le mois avec deux chiffres
    const newMonth = monthNum.toString().padStart(2, '0');

    // Formater la nouvelle date et mettre à jour l'état
    const newDate = `${yearNum}${newMonth}`;
    setMonth(newDate);
  };

  const categoriesDf = ["Abonnement", "Carburant"];
  const categoriesLoisir = ["Bar/Boite", "Resto", "Sport", "Activité", "Vêtements"];

  const dataDf = calculTotalByMonth("Dépense", month, userInfo.id, categoriesDf);
  const dataLoisir = calculTotalByMonth("Dépense", month, userInfo.id, categoriesLoisir);

  const montantTotalLoisirDf = formatData(parseFloat(dataDf)) + formatData(parseFloat(dataLoisir));

  const montantEpargne = parseFloat(montantRecettesLastMonth) - parseFloat(montantTotalLoisirDf);

  return (
    <>
      <h2 className="text-5xl font-thin mb-9">Tableau de bord</h2>
      <section className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 h-1/2">
          <div className="w-1/3 bg-zinc-900 rounded-xl h-max p-4 flex flex-col gap-4">
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
          <div className="w-1/3 bg-zinc-900 rounded-xl h-max p-4 flex flex-col gap-4">
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
          <div className="w-1/3 bg-zinc-900 rounded-xl h-full p-4 flex flex-col gap-4">
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
          <div className="w-1/3 bg-zinc-900 rounded-xl p-4">
            <h2 className="text-3xl font-extralight italic">Répartitions</h2>
            <div className="flex flex-row justify-between w-full py-3 px-10">
              <CircleArrowLeft size={20} onClick={clickLastMonth} className="cursor-pointer hover:scale-95 transition-all" />
              <p className="font-thin">{convertDate(month)}</p>
              <CircleArrowRight size={20} onClick={clickNextMonth} className={`cursor-pointer hover:scale-95 transition-all ${month >= currentDate ? "invisible" : ""}`} />
            </div>
            <Camembert dataDf={formatData(dataDf)} dataLoisir={formatData(dataLoisir)} dataEpargne={montantEpargne} />
            <div className="flex flex-col justify-center w-full mt-2">
              <div className="flex flex-row justify-center items-center">
                <div className="w-3 h-3 rounded bg-colorChart1">

                </div>
                <p className="w-2/5 font-thin text-sm">Dépenses loisirs</p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <div className="w-3 h-3 rounded bg-colorChart2">

                </div>
                <p className="w-2/5 font-thin text-sm">Dépenses fixes</p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <div className="w-3 h-3 rounded bg-colorChart3">

                </div>
                <p className="w-2/5 font-thin text-sm">Épargne</p>
              </div>

            </div>
          </div>
          <div className="w-2/3 bg-zinc-900 rounded-xl h-80 p-4">
            <h2 className="text-3xl font-extralight italic">Graphique</h2>
          </div>
        </div>
      </section>
    </>
  );
}
