import React from "react";
import BtnReturn from "../composant/Button/btnReturn"; // Assurez-vous d'importer BtnReturn
import BtnAdd from "../composant/Button/btnAdd"; // Assurez-vous d'importer BtnAdd
// Assurez-vous d'importer ListCollapse
import BtnFilter from "../composant/Button/btnFilter"; // Assurez-vous d'importer BtnFilter
import Title from "../composant/Text/title";
import {
  ChevronLeft,
  ChevronRight,
  ListCollapse,
  Search,
} from "lucide-react/dist/cjs/lucide-react";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";

function LayoutOperation({
  title,
  typeProps,
  categories,
  openModal,
  check,
  selectOpe,
  setClickResearch,
  clickResearch,
  handleSelectOpe,
  clickLastMonth,
  clickNextMonth,
  date,
  pageById,
  refund,
  refundVisible,
  handleRefund,
  pageAdd,
  pageBoard,
  pageTable,
}) {
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const canReturn = pathSegments.length >= 2;

  return (
    <div className="w-full justify-between items-start flex animate-fade">
      <div className="flex gap-2 items-center w-1/4 justify-start">
        {canReturn && <BtnReturn />}
        {!pageAdd && <BtnAdd to={`/${typeProps}`} />}
        {pageById ||
          (!pageBoard && (
            <>
              <Search
                onClick={() => setClickResearch(!clickResearch)}
                className="cursor-pointer hover:scale-110 transition-all"
              />
              <ListCollapse
                className={`cursor-pointer hover:scale-110 transition-all ${selectOpe ? "text-zinc-500" : ""}`}
                onClick={handleSelectOpe}
              />
              <BtnFilter
                categories={categories}
                action={openModal}
                check={check}
              />
            </>
          ))}
      </div>
      <Title title={title} className="w-2/4" />
      <div className="w-1/4 flex justify-end">
        {refund && (
          <button
            className="cursor-pointer border-1 hover:border-blue-500 transition-all"
            onClick={handleRefund}
          >
            {refundVisible ? "Revenir" : "Ajouter un remboursement"}
          </button>
        )}
        {pageTable && (
          <div
            className={`flex gap-4 top-0 right-0 ${typeProps === "invest" || date === "all" ? "invisible" : ""}`}
          >
            <ChevronLeft
              className="hover:bg-zinc-200 hover:dark:bg-zinc-800 rounded-full p-2 cursor-pointer duration-300 transition-all"
              size={37.5}
              onClick={clickLastMonth}
            />
            <ChevronRight
              className="hover:bg-zinc-200 hover:dark:bg-zinc-800 rounded-full p-2 cursor-pointer duration-300 transition-all"
              size={37.5}
              onClick={clickNextMonth}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default LayoutOperation;