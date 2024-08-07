import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calculEconomie, calculMoyenne, calculMoyenneEconomie, calculTotalByMonth, calculTotalByYear } from "../../utils/calcul";
import { months } from "../../utils/fonctionnel";
import { infoUser } from "../../utils/users";
import LinkStat from "../../components/Stats/linkStat";
import BoxStat from "../../components/Stats/boxStat";
import { CamembertStat } from "../../components/Charts/camembertStat";
import { getTransactionsByMonth, getTransactionsByYear } from "../../utils/operations";
import { categorieDepense, categorieRecette } from "../../../public/categories.json";

export default function Statistique() {
  const getCurrentMonthAndYear = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    return { month: currentMonth, year: currentYear };
  };

  const userInfo = infoUser();
  const { month: currentMonth, year: currentYear } = getCurrentMonthAndYear();
  const [selectedMonth, setSelectedMonth] = useState(String(currentMonth).padStart(2, '0'));
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [firstYear, setFirstYear] = useState(currentYear);
  const [filteredOperation, setFilteredOperation] = useState([]);

  const transactionReducer = useSelector((state: any) => state.transactionReducer);

  useEffect(() => {
    setFilteredOperation(transactionReducer);
  }, [transactionReducer]);

  useEffect(() => {
    const yearsSet = new Set();
    let minYear = currentYear;

    filteredOperation?.forEach((transaction: any) => {
      const year = new Date(transaction.date).getFullYear();
      if (transaction.user === userInfo.id) {
        yearsSet?.add(year);
        if (year < minYear) {
          minYear = year;
        }
      }
    });

    setFirstYear(minYear);
  }, [filteredOperation, userInfo.id, currentYear]);

  const clickMonth = (month: any) => {
    setSelectedMonth(month);
  };

  const clickYear = (year: any) => {
    setSelectedYear(year);
    if (year === currentYear) {
      setSelectedMonth(String(currentMonth).padStart(2, '0'));
    } else {
      setSelectedMonth('01');
    }
  };

  const [selectedByYear, setSelectedByYear] = useState(false)

  const switchMonthYear = () => {
    setSelectedByYear(!selectedByYear)
  }

  const generateYears = () => {
    const years = [];
    for (let year = firstYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  const generateMonths = () => {
    if (selectedYear === currentYear) {
      return Array.from({ length: currentMonth }, (_, i) => i + 1);
    }
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };
  const selectedDate = `${selectedYear}${selectedMonth}`;

  const depenseYear = calculTotalByYear("Dépense", `${selectedYear}`, null, null);
  const recetteYear = calculTotalByYear("Recette", `${selectedYear}`, null, null);

  const depenseMonth = calculTotalByMonth("Dépense", selectedDate, null, null);
  const recetteMonth = calculTotalByMonth("Recette", selectedDate, null, null);

  const nbMonth = generateMonths().length;

  const moyenneDepenseMois = calculMoyenne("Dépense", `${selectedYear}`, nbMonth);
  const moyenneRecetteMois = calculMoyenne("Recette", `${selectedYear}`, nbMonth);

  const economieTotale = calculEconomie(`${selectedYear}`, null);
  const economieTotaleNumber = parseInt(economieTotale);
  const economieMonth = calculEconomie(`${selectedYear}`, selectedMonth);
  const moyenneEconomie = calculMoyenneEconomie(moyenneDepenseMois, moyenneRecetteMois);

  return (
    <section className="w-full">
      <h2 className="text-5xl font-thin mb-5">Statistiques</h2>
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-row gap-2">
          {generateYears().map((year, index) => (
            <button
              className={`text-xs rounded-xl transition-all border-1  hover:border-blue-400 ${selectedYear === year ? 'border-blue-400' : ''}`}
              key={index}
              onClick={() => clickYear(year)}
            >
              {year}
            </button>
          ))}
          <div className="w-px bg-zinc-400 dark:bg-zinc-600" />
          {generateMonths().map((monthIndex: any, index) => (
            <button
              className={`text-xs rounded-xl transition-all border-1 w-full hover:border-blue-400 ${selectedMonth === String(monthIndex).padStart(2, '0') ? 'border-blue-400' : ''}`}
              key={index}
              onClick={() => clickMonth(String(monthIndex).padStart(2, '0'))}
            >
              {months[monthIndex - 1]}
            </button>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col items-center gap-4 w-2/3">
            <div className="flex flex-row gap-4 w-full h-full text-right">
              <LinkStat link={`/recette/${selectedYear}`} type="Recette totale" months="" selectedYear={selectedYear} montant={recetteYear} />
              <LinkStat link={`/depense/${selectedYear}`} type="Dépense totale" months="" selectedYear={selectedYear} montant={depenseYear} />
              <div className={`flex flex-col-reverse font-thin justify-between w-full bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ${economieTotaleNumber < 0 ? 'ring-red-800' : 'ring-green-800'}`}>
                <div className="flex justify-between">
                  <p className="text-xs text-left italic">Économie totale</p>
                  <p className="text-xs text-left italic">En {selectedYear}</p>
                </div>
                <p className="text-3xl">{economieTotale} €</p>
              </div>
            </div>
            <div className="flex flex-row gap-4 w-full h-full text-right">
              <BoxStat type="Recette/Mois" selectedYear={selectedYear} montant={moyenneRecetteMois} />
              <BoxStat type="Dépense/Mois" selectedYear={selectedYear} montant={moyenneDepenseMois} />
              <BoxStat type="Économie/Mois" selectedYear={selectedYear} montant={`${moyenneEconomie}`} months="" selectedMonth="" />
            </div>
            <div className="w-4/5 h-px bg-zinc-400 dark:bg-zinc-600" />
            <div className="flex flex-row gap-4 text-right w-full h-full">
              <LinkStat link={`/recette/${selectedYear}${selectedMonth}`} type="Recette" months={months} selectedMonth={selectedMonth} selectedYear={selectedYear} montant={recetteMonth} />
              <LinkStat link={`/depense/${selectedYear}${selectedMonth}`} type="Dépense" months={months} selectedMonth={selectedMonth} selectedYear={selectedYear} montant={depenseMonth} />
              <BoxStat type={parseFloat(economieMonth) < 0 ? "Déficit" : "Économie"} selectedYear={selectedYear} montant={economieMonth} months={months} selectedMonth={selectedMonth} />
            </div>
          </div>



          <div className="flex flex-col gap-4 w-1/3 text-right rounded-2xl items-center h-full">
            {
              selectedByYear ?
                <>
                  <div className="flex flex-col w-full rounded-2xl  h-auto items-center p-4 bg-zinc-100 dark:bg-zinc-900">
                    <p className="italic font-thin">Répartition des recettes de {selectedYear}</p>
                    <CamembertStat transactions={getTransactionsByYear(`${selectedYear}`, "Recette", null, null)} categorie={categorieRecette} />
                  </div>
                  <button onClick={switchMonthYear} className="font-thin italic w-3/4 hover:scale-95 transition-all">Voir le mois</button>
                  <div className="flex flex-col w-full rounded-2xl  h-full items-center p-4 bg-zinc-100 dark:bg-zinc-900">
                    <p className="italic font-thin">Répartition des dépenses de {selectedYear}</p>
                    <CamembertStat transactions={getTransactionsByYear(`${selectedYear}`, "Dépense", null, null)} categorie={categorieDepense} />
                  </div>
                </>
                :
                <>
                  <div className="flex flex-col w-full rounded-2xl  h-auto items-center p-4 bg-zinc-100 dark:bg-zinc-900">
                    <p className="italic font-thin">Répartition des recettes de {months[parseInt(selectedMonth, 10) - 1].toLowerCase()} {selectedYear}</p>
                    <CamembertStat transactions={getTransactionsByMonth(selectedDate, "Recette", null, null)} categorie={categorieRecette} />
                  </div>
                  <button onClick={switchMonthYear} className="font-thin italic w-3/4 hover:scale-95 transition-all">Voir l'année</button>
                  <div className="flex flex-col w-full rounded-2xl  h-full items-center p-4 bg-zinc-100 dark:bg-zinc-900">
                    <p className="italic font-thin">Répartition des dépenses de {months[parseInt(selectedMonth, 10) - 1].toLowerCase()} {selectedYear}</p>
                    <CamembertStat transactions={getTransactionsByMonth(selectedDate, "Dépense", null, null)} categorie={categorieDepense} />
                  </div>
                </>
            }




          </div>
        </div>

      </div>
    </section>
  );
}
