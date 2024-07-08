import { useEffect, useState } from "react";
import { calculEconomie, calculMoyenne, calculMoyenneEconomie, calculTotalByMonth, calculTotalByYear } from "../../utils/calcul";
import { useSelector } from "react-redux";
import { months } from "../../utils/fonctionnel";
import { infoUser } from "../../utils/users";
import LinkStat from "../../components/Stats/linkStat";
import BoxStat from "../../components/Stats/boxStat";

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

  const depenseYear = calculTotalByYear("Dépense", `${selectedYear}`, userInfo.id);
  const recetteYear = calculTotalByYear("Recette", `${selectedYear}`, userInfo.id);

  const depenseMonth = calculTotalByMonth("Dépense", selectedDate, userInfo.id);
  const recetteMonth = calculTotalByMonth("Recette", selectedDate, userInfo.id);

  const nbMonth = generateMonths().length;

  const moyenneDepenseMois = calculMoyenne("Dépense", `${selectedYear}`, nbMonth, userInfo.id);
  const moyenneRecetteMois = calculMoyenne("Recette", `${selectedYear}`, nbMonth, userInfo.id);

  const economieTotale = calculEconomie(`${selectedYear}`, null, userInfo.id);
  const economieTotaleNumber = parseInt(economieTotale);
  const economieMonth = calculEconomie(`${selectedYear}`, selectedMonth, userInfo.id);
  const moyenneEconomie = calculMoyenneEconomie(moyenneDepenseMois, moyenneRecetteMois);

  return (
    <>
      <h2 className="text-5xl font-thin mb-9">Statistiques</h2>
      <section className="flex flex-col gap-4">
        <div className="flex flex-row justify-center gap-2 w-full">
          {generateYears().map((year, index) => (
            <button
              className={`text-xs rounded-xl transition-all border-1 hover:border-blue-400 ${selectedYear === year ? 'border-blue-400' : ''}`}
              key={index}
              onClick={() => clickYear(year)}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="flex flex-row gap-4 w-full text-right">

          <LinkStat
            link={`/recette/${selectedYear}${selectedMonth}`}
            type="Recette totale"
            months=""
            selectedYear={selectedYear}
            montant={recetteYear}
          />

          <LinkStat
            link={`/depense/${selectedYear}${selectedMonth}`}
            type="Dépense totale"
            months=""
            selectedYear={selectedYear}
            montant={depenseYear}
          />

          <div className={`flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ${economieTotaleNumber < 0 ? 'ring-red-800' : 'ring-green-800'}`}>
            <div className="flex justify-between">
              <p className="text-xs text-left italic">Économie totale</p>
              <p className="text-xs text-left italic">En {selectedYear}</p>
            </div>
            <p className="text-4xl">{economieTotale} €</p>
          </div>
        </div>

        <div className="flex flex-row gap-4 w-full text-right">

          <BoxStat
            type="Recette/Mois"
            selectedYear={selectedYear}
            montant={moyenneRecetteMois}
          />

          <BoxStat
            type="Dépense/Mois"
            selectedYear={selectedYear}
            montant={moyenneDepenseMois}
          />

          <BoxStat
            type="Économie/Mois"
            selectedYear={selectedYear}
            montant={`${moyenneEconomie}`}
            months=""
            selectedMonth=""
          />
        </div>

        <div className="flex flex-row justify-center gap-2 w-full">
          {generateMonths().map((monthIndex: any, index) => (
            <button
              className={`text-xs rounded-xl transition-all border-1 hover:border-blue-400 ${selectedMonth === String(monthIndex).padStart(2, '0') ? 'border-blue-400' : ''}`}
              key={index}
              onClick={() => clickMonth(String(monthIndex).padStart(2, '0'))}
            >
              {months[monthIndex - 1]} {selectedYear}
            </button>
          ))}
        </div>

        <div className="flex flex-row gap-4 text-right w-full">

          <LinkStat
            link={`/recette/${selectedYear}${selectedMonth}`}
            type="Recette"
            months={months}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            montant={recetteMonth}
          />

          <LinkStat
            link={`/depense/${selectedYear}${selectedMonth}`}
            type="Dépense"
            months={months}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            montant={depenseMonth}
          />

          <BoxStat
            type="Économie"
            selectedYear={selectedYear}
            montant={economieMonth}
            months={months}
            selectedMonth={selectedMonth}
          />
        </div>
      </section>
    </>
  );
}
