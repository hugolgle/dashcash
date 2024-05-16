import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { calculEconomie, calculMoyenne, calculMoyenneEconomie, calculTotalByMonth, calculTotalByYear } from "../../utils/calcul";
import { useSelector } from "react-redux";
import { months } from "../../utils/fonctionnel";
import { infoUser } from "../../utils/users";

export default function Statistique() {

  const getCurrentMonthAndYear = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    return { month: currentMonth, year: currentYear };
  };
  const userInfo = infoUser()
  const { month, year } = getCurrentMonthAndYear();

  const [selectedMonth, setSelectedMonth] = useState(String(month).padStart(2, '0'));
  const [selectedYear, setSelectedYear] = useState(year);

  const [uniqueMonths, setUniqueMonths] = useState<string[]>([]);
  const [uniqueYears, setUniqueYears] = useState<number[]>([]);

  const [filteredOperation, setFilteredOperation] = useState([]);

  useEffect(() => {
    const monthsSet = new Set();
    const yearsSet = new Set();

    filteredOperation?.forEach((transaction: any) => {
      const month = new Date(transaction.date).getMonth();
      const year = new Date(transaction.date).getFullYear();

      // Vérifiez si la transaction appartient à l'utilisateur sélectionné,
      // ainsi que l'année sélectionnée
      if (transaction.user === userInfo.id && year === selectedYear) {
        monthsSet?.add(month);
      }

      // Ajoutez l'année à l'ensemble des années si la transaction appartient à l'utilisateur sélectionné
      if (transaction.user === userInfo.id) {
        yearsSet?.add(year);
      }
    });

    const sortedMonths = Array.from(monthsSet).sort((a: any, b: any) => parseInt(a, 10) - parseInt(b, 10));
    const sortedYears = Array.from(yearsSet).sort((a: any, b: any) => parseInt(a, 10) - parseInt(b, 10));

    setUniqueMonths(sortedMonths as string[]);
    setUniqueYears(sortedYears as number[]);

  }, [filteredOperation, selectedYear, userInfo.id]);



  const clickMonth = (month: any) => {
    setSelectedMonth(month);
  };


  const clickYear = (year: any) => {
    setSelectedYear(year);
  };


  const operationReducer = useSelector((state: any) => state.operationReducer);

  useEffect(() => {
    setFilteredOperation(operationReducer);
  }, [operationReducer]);

  const selectedDate = `${selectedYear}${selectedMonth}`


  const depenseYear = calculTotalByYear("Dépense", `${selectedYear}`, userInfo.id)
  const recetteYear = calculTotalByYear("Recette", `${selectedYear}`, userInfo.id)

  const depenseMonth = calculTotalByMonth("Dépense", selectedDate, userInfo.id)
  const recetteMonth = calculTotalByMonth("Recette", selectedDate, userInfo.id)

  const nbMonth = uniqueMonths.length


  const moyenneDepenseMois = calculMoyenne("Dépense", `${selectedYear}`, nbMonth, userInfo.id)
  const moyenneRecetteMois = calculMoyenne("Recette", `${selectedYear}`, nbMonth, userInfo.id)

  const economieTotale = calculEconomie(`${selectedYear}`, null, userInfo.id)
  const economieTotaleNumber = parseInt(economieTotale);
  const economieMonth = calculEconomie(`${selectedYear}`, selectedMonth, userInfo.id)
  const economieMonthNumber = parseInt(economieMonth);
  const moyenneEconomie = calculMoyenneEconomie(moyenneDepenseMois, moyenneRecetteMois)
  const moyenneEconomieNumber = parseInt(moyenneEconomie);

  return <>
    <h2 className="text-5xl font-thin mb-9">Statistiques</h2>
    <section className=" flex flex-col gap-4">

      <div className="flex flex-row justify-center gap-2 w-full">
        {uniqueYears.map((year, index) => (
          <button
            className={`text-xs rounded-xl transition-all border-1 hover:border-blue-400 ${selectedYear === year ? 'border-blue-400' : ''}`}
            key={index}
            onClick={() => clickYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="flex flex-row gap-4  w-full text-right">
        <Link to={`/recette/${selectedYear}`} className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 hover:scale-95 transition-all px-4 py-2 gap-4 ring-2 ring-green-800 ring-inset">
          <div className="flex justify-between">
            <p className="text-xs text-left italic">Recette totale</p>
            <p className="text-xs text-left italic">En {selectedYear}</p>
          </div>
          <p className="text-4xl">{recetteYear}</p>
        </Link>

        <Link to={`/depense/${selectedYear}`} className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 hover:scale-95 transition-all px-4 py-2 gap-4 ring-2 ring-red-800 ring-inset">
          <div className="flex justify-between">
            <p className="text-xs text-left italic">Dépense totale</p>
            <p className="text-xs text-left italic">En {selectedYear}</p>
          </div>
          <p className="text-4xl">{depenseYear}</p>
        </Link>

        <div className={`flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ${economieTotaleNumber < 0 ? 'ring-red-800' : 'ring-green-800'}`}>
          <div className="flex justify-between">
            <p className="text-xs text-left italic">Économie totale</p>
            <p className="text-xs text-left italic">En {selectedYear}</p>
          </div>
          <p className="text-4xl">{economieTotale} €</p>
        </div>
      </div>

      <div className="flex flex-row gap-4 w-full text-right">
        <div className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ring-green-800 ring-inset" >
          <div className="flex justify-between">
            <p className="text-xs text-left italic">Recette/Mois</p>
            <p className="text-xs text-left italic">En {selectedYear}</p>
          </div>
          <p className="text-4xl">{moyenneRecetteMois}</p>
        </div>
        <div className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ring-red-800 ring-inset">
          <div className="flex justify-between">
            <p className="text-xs text-left italic">Dépense/Mois</p>
            <p className="text-xs text-left italic">En {selectedYear}</p>
          </div>
          <p className="text-4xl">{moyenneDepenseMois}</p>
        </div>
        <div className={`flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ${moyenneEconomieNumber < 0 ? 'ring-red-800' : 'ring-green-800'}`}>
          <div className="flex justify-between">
            <p className="text-xs text-left italic">Économie/Mois</p>
            <p className="text-xs text-left italic">En {selectedYear}</p>
          </div>
          <p className="text-4xl">{moyenneEconomie} €</p>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-2 w-full">
        {uniqueMonths.map((monthIndex: any, index) => (
          <button
            className={`text-xs rounded-xl transition-all border-1 hover:border-blue-400 ${selectedMonth === (monthIndex + 1).toString().padStart(2, '0') ? 'border-blue-400' : ''}`}
            key={index}
            onClick={() => clickMonth(String(monthIndex + 1).padStart(2, '0'))}
          >
            {months[monthIndex]} {selectedYear}
          </button>
        ))}
      </div>

      <div className="flex flex-row gap-4 text-right w-full">
        <Link to={`/recette/${selectedYear}${selectedMonth}`} className="w-full flex flex-col-reverse gap-4 justify-between bg-zinc-900 rounded-2xl hover:bg-opacity-80 hover:scale-95 transition-all px-4 py-2 ring-2 ring-green-800 ring-inset">
          <div className="flex justify-between">
            <p className="text-xs text-left italic">Recette</p>
            <p className="text-xs text-left italic">En {months[parseInt(selectedMonth) - 1]} {selectedYear}</p>
          </div>
          <p className="text-4xl">{recetteMonth}</p>
        </Link>

        <Link to={`/depense/${selectedYear}${selectedMonth}`} className="w-full flex flex-col-reverse gap-4 justify-between bg-zinc-900 rounded-2xl hover:bg-opacity-80 hover:scale-95 transition-all px-4 py-2 ring-2 ring-red-800 ring-inset">
          <div className="flex justify-between">
            <p className="text-xs text-left italic">Dépense</p>
            <p className="text-xs text-left italic">En {months[parseInt(selectedMonth) - 1]} {selectedYear}</p>
          </div>
          <p className="text-4xl">{depenseMonth}</p>
        </Link>

        <div className={`w-full flex flex-col-reverse gap-4 justify-between bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 ring-2 ${economieMonthNumber < 0 ? 'ring-red-800' : 'ring-green-800'}`}>
          <div className="flex justify-between">
            <p className="text-xs text-left italic">Économie</p>
            <p className="text-xs text-left italic">En {months[parseInt(selectedMonth) - 1]} {selectedYear}</p>
          </div>
          <p className="text-4xl">{economieMonth} €</p>
        </div>
      </div>
    </section>
  </>

}
