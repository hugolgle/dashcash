import { useEffect, useState } from "react";
import { calculTotalByMonth, months } from "../../utils/utils";
import { useSelector } from "react-redux";

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

    filteredOperation?.forEach((transaction) => {
      const month = new Date(transaction.date).getMonth();
      const year = new Date(transaction.date).getFullYear();

      monthsSet?.add(month);
      yearsSet?.add(year);
    });

    const sortedMonths = Array.from(monthsSet).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    const sortedYears = Array.from(yearsSet).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));


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

  return <>
    <h2 className="text-5xl font-thin mb-9">Statistiques</h2>
    <section className=" flex flex-col gap-4">

      <div className="flex flex-row justify-center gap-2 w-full">
        {uniqueYears.map((year, index) => (
          <button
            className={`text-xs rounded-full transition-all border-2 hover:border-blue-500 ${selectedYear === year ? 'border-blue-500' : ''}`}
            key={index}
            onClick={() => clickYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="flex flex-row justify-center gap-2 w-full">
        {uniqueMonths.map((monthIndex: any, index) => (
          <button
            className={`text-xs rounded-full transition-all border-2 hover:border-blue-500 ${selectedMonth === (monthIndex + 1).toString().padStart(2, '0') ? 'border-blue-500' : ''}`}
            key={index}
            onClick={() => clickMonth(String(monthIndex + 1).padStart(2, '0'))}
          >
            {months[monthIndex]}
          </button>
        ))}
      </div>

      <div className="flex flex-row gap-4  w-full text-left">
        <div className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2 gap-4">
          <p>Dépense</p>
          <p className="text-4xl">{calculTotalByMonth("Dépense", selectedDate)}</p>
        </div>
        <div className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2 gap-4" >
          <p>Recette</p>
          <p className="text-4xl">{calculTotalByMonth("Recette", selectedDate)}</p>
        </div>
        <div className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2 gap-4">
          <p>Moyenne dépense</p>
          <p className="text-4xl">1 000.00€</p>
        </div>
        <div className="flex flex-col-reverse justify-between w-full bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2 gap-4">
          <p>Moyenne recette</p>
          <p className="text-4xl">1 000.00€</p>
        </div>
      </div>

      <div className="flex flex-row-reverse w-full h-64 gap-4">
        <div className="bg-zinc-900 h-full w-3/5 rounded-2xl hover:bg-opacity-80 transition-all p-2">

        </div>
        <div className="flex flex-col h-full w-2/5 gap-4">
          <div className="bg-zinc-900 w-full h-1/2 rounded-2xl hover:bg-opacity-80 transition-all p-2">

          </div>
          <div className="bg-zinc-900 w-full h-1/2 rounded-2xl hover:bg-opacity-80 transition-all p-2">

          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4  w-full">
        <div className="w-full h-44 bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2">
          <p>Moyenne recette</p>
          <p className="text-4xl">1 000.00€</p>
        </div>
        <div className="w-5/6 h-44 bg-zinc-900 rounded-2xl hover:bg-opacity-80 transition-all p-2">
          <p>Moyenne recette</p>
          <p className="text-4xl">1 000.00€</p>
        </div>
      </div>

    </section>
  </>

}
