import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { addSpace, formatAmount } from "../../utils/fonctionnel";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { LoaderCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Tableau({
  type,
  columns,
  data,
  selectOpe,
  isFetching,
}) {
  const { status } = useParams();

  const [selectAllRow, setSelectAllRow] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});

  const handleSelectAllRow = (checked) => {
    setSelectAllRow(checked);
    const newSelectedRows = {};
    data?.forEach((transaction) => {
      newSelectedRows[transaction._id] = checked;
    });
    setSelectedRows(newSelectedRows);
  };

  const handleSelectRow = (id, checked) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedRows = { ...prevSelectedRows, [id]: checked };

      const allSelected =
        data.length > 0 &&
        data.every((transaction) => updatedRows[transaction._id]);

      setSelectAllRow(allSelected);

      return updatedRows;
    });
  };

  const calculMontantSelect = () => {
    let total = 0;
    data?.forEach((transaction) => {
      if (selectedRows[transaction._id]) {
        total += parseFloat(transaction.amount);
      }
    });
    return total;
  };

  const montantSelect = calculMontantSelect();

  const { theme } = useTheme();
  const bgColor =
    theme === "custom"
      ? "bg-colorPrimaryCustom"
      : "bg-colorPrimaryLight dark:bg-colorPrimaryDark";

  return (
    <>
      {data && data.length > 0 ? (
        <Table className="w-full flex flex-col px-1 animate-fade relative">
          <TableHeader className="flex w-full items-center">
            {selectOpe && (
              <div className="mr-5 text-xs">
                <Checkbox
                  checked={selectAllRow}
                  onCheckedChange={handleSelectAllRow}
                  aria-label="Select all rows"
                />
              </div>
            )}
            <TableRow className="w-full flex h-7 italic">
              {columns.map(({ name }) => (
                <TableHead key={name} className="w-full text-center">
                  {name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="flex flex-col justify-center items-center w-full">
            {data.map((item) => (
              <div className="flex w-full items-center" key={item._id}>
                {selectOpe && (
                  <div className="mr-5">
                    <Checkbox
                      checked={!!selectedRows[item._id]}
                      onCheckedChange={(checked) =>
                        handleSelectRow(item._id, checked)
                      }
                      aria-label={`Select row ${item._id}`}
                    />
                  </div>
                )}
                <Link to={item._id} className="w-full">
                  <TableRow
                    className={`rounded-[14px] flex my-1 flex-row items-center h-10 ${bgColor} animate-fade cursor-pointer hover:bg-opacity-75 hover:dark:bg-opacity-75 transition-all ${selectOpe && selectedRows[item._id] ? "ring-1 ring-zinc-400" : ""}`}
                  >
                    <TableCell className="w-full">
                      {item._id.substring(4, 8)}
                    </TableCell>

                    {type === "investments" && (
                      <>
                        <TableCell className="w-full">{item.type}</TableCell>
                        <TableCell className="w-full truncate">
                          {item.title}
                        </TableCell>
                        <TableCell className="w-full">
                          {format(item.date, "EEEE, MMMM dd, yyyy")}
                        </TableCell>
                        {status === "all" && (
                          <TableCell className="w-full">
                            <p>{item.isSold ? "Vendu" : "En cours"}</p>
                          </TableCell>
                        )}
                        <TableCell className="w-full">
                          <b>{addSpace(item.amount)} €</b>
                        </TableCell>
                        {status === "sold" && (
                          <>
                            <TableCell className="w-full">
                              <b>{formatAmount(item.montantVendu)} €</b>
                            </TableCell>
                            <TableCell className="w-full">
                              <b>
                                {item.benefice > 0
                                  ? `+${formatAmount(item.benefice)} €`
                                  : `-${formatAmount(item.benefice)} €`}
                              </b>
                            </TableCell>
                          </>
                        )}
                      </>
                    )}
                    {type === "transactions" && (
                      <>
                        <TableCell className="w-full truncate">
                          {item.title}
                        </TableCell>
                        <TableCell className="w-full">
                          {item.category}
                        </TableCell>
                        <TableCell className="w-full">
                          {format(item.date, "d MMMM yyyy", { locale: fr })}
                        </TableCell>
                        <TableCell className="w-full">
                          <b>{addSpace(item.amount)} €</b>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </Link>
              </div>
            ))}
          </TableBody>
          {isFetching && (
            <LoaderCircle className="absolute top-0 right-0 animate-spin" />
          )}
        </Table>
      ) : (
        <p>Aucune opération n'a été trouvée ...</p>
      )}
      {selectOpe && (
        <div className="fixed w-44 bottom-10 right-0 rounded-l-xl z-50 bg-white dark:bg-black py-3 transition-all">
          Total sélectionnés : <br />
          <b>{formatAmount(montantSelect)} €</b>
          <br />
        </div>
      )}
    </>
  );
}
