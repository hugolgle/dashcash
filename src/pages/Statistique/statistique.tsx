import { useEffect, useState } from "react";
import { calculEconomie, calculMoyenne, calculMoyenneEconomie, calculTotalByMonth, calculTotalByYear } from "../../utils/calcul";
import { useSelector } from "react-redux";
import { months } from "../../utils/fonctionnel";

export default function Statistique() {

  const getCurrentMonthAndYear = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    return { month: currentMonth, year: currentYear };
  };

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

      monthsSet?.add(month);
      yearsSet?.add(year);
    });

    const sortedMonths = Array.from(monthsSet).sort((a: any, b: any) => parseInt(a, 10) - parseInt(b, 10));
    const sortedYears = Array.from(yearsSet).sort((a: any, b: any) => parseInt(a, 10) - parseInt(b, 10));

    setUniqueMonths(sortedMonths as string[]);
    setUniqueYears(sortedYears as number[]);

  }, [filteredOperation]);

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


  const depenseYear = calculTotalByYear("Dépense", `${selectedYear}`)
  const recetteYear = calculTotalByYear("Recette", `${selectedYear}`)

  const depenseMonth = calculTotalByMonth("Dépense", selectedDate)
  const recetteMonth = calculTotalByMonth("Recette", selectedDate)

  const nbMonth = uniqueMonths.length


  const moyenneDepenseMois = calculMoyenne("Dépense", `${selectedYear}`, nbMonth)
  const moyenneRecetteMois = calculMoyenne("Recette", `${selectedYear}`, nbMonth)

  const economieTotale = calculEconomie(`${selectedYear}`, null)
  const economieTotaleNumber = parseInt(economieTotale);
  const economieMonth = calculEconomie(`${selectedYear}`, selectedMonth)
  const economieMonthNumber = parseInt(economieMonth);
  const moyenneEconomie = calculMoyenneEconomie(moyenneDepenseMois, moyenneRecetteMois)
  const moyenneEconomieNumber = parseInt(moyenneEconomie);

  return <>
    <h2 className="text-5xl font-thin mb-9">Statistiques</h2>
    <section className=" flex flex-col gap-4">

      <div className="flex flex-row justify-center gap-2 w-full">
        {uniqueYears.map((year, index) => (
          <button
            className={`text-xs rounded-full transition-all border-1 hover:border-blue-500 ${selectedYear === year ? 'border-blue-500' : ''}`}
            key={index}
            onClick={() => clickYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="flex flex-row gap-4  w-full text-left">
        <div className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ring-green-800 ring-inset" >
          <p className="text-xs text-right">Recette totale</p>
          <p className="text-4xl">{recetteYear}</p>
        </div>
        <div className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ring-red-800 ring-inset">
          <p className="text-xs text-right">Dépense totale</p>
          <p className="text-4xl">{depenseYear}</p>
        </div>
        <div className={`flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ${economieTotaleNumber < 0 ? 'ring-red-800' : 'ring-green-800'}`}>
          <p className="text-xs text-right">Économie totale</p>
          <p className="text-4xl">{economieTotale} €</p>
        </div>
      </div>

      <div className="flex flex-row gap-4 w-full text-left">
        <div className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ring-green-800 ring-inset" >
          <p className="text-xs text-right">Recette/Mois</p>
          <p className="text-4xl">{moyenneRecetteMois}</p>
        </div>
        <div className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ring-red-800 ring-inset">
          <p className="text-xs text-right">Dépense/Mois</p>
          <p className="text-4xl">{moyenneDepenseMois}</p>
        </div>
        <div className={`flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 gap-4 ring-2 ${moyenneEconomieNumber < 0 ? 'ring-red-800' : 'ring-green-800'}`}>
          <p className="text-xs text-right">Économie/Mois</p>
          <p className="text-4xl">{moyenneEconomie} €</p>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-2 w-full">
        {uniqueMonths.map((monthIndex: any, index) => (
          <button
            className={`text-xs rounded-full transition-all border-1 hover:border-blue-500 ${selectedMonth === (monthIndex + 1).toString().padStart(2, '0') ? 'border-blue-500' : ''}`}
            key={index}
            onClick={() => clickMonth(String(monthIndex + 1).padStart(2, '0'))}
          >
            {months[monthIndex]}
          </button>
        ))}
      </div>

      <div className="flex flex-row gap-4 text-left w-full">
        <div className="w-full flex flex-col-reverse gap-4 justify-between bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 ring-2 ring-green-800 ring-inset">
          <p className="text-xs text-right">Recette</p>
          <p className="text-4xl">{recetteMonth}</p>
        </div>
        <div className="w-full flex flex-col-reverse gap-4 justify-between bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 ring-2 ring-red-800 ring-inset">
          <p className="text-xs text-right">Dépense</p>
          <p className="text-4xl">{depenseMonth}</p>
        </div>
        <div className={`w-full flex flex-col-reverse gap-4 justify-between bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all px-4 py-2 ring-2 ${economieMonthNumber < 0 ? 'ring-red-800' : 'ring-green-800'}`}>
          <p className="text-xs text-right">Économie</p>
          <p className="text-4xl">{economieMonth} €</p>
        </div>
      </div>

      {/* <div className="flex flex-row-reverse w-full h-64 gap-4">
        <div className="bg-zinc-900 h-full w-3/5 rounded-2xl hover:bg-opacity-80 transition-all p-2">

        </div>
        <div className="flex flex-col h-full w-2/5 gap-4">
          <div className="bg-zinc-900 w-full h-1/2 rounded-2xl hover:bg-opacity-80 transition-all p-2">

          </div>
          <div className="bg-zinc-900 w-full h-1/2 rounded-2xl hover:bg-opacity-80 transition-all p-2">

          </div>
        </div>
      </div> */}
    </section>
  </>

}
