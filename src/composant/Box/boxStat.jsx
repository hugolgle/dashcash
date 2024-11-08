import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

function BoxStat(props) {
  const [currentMontant, setCurrentMontant] = useState(0);
  const [previousMontant, setPreviousMontant] = useState(0);

  const amountAsString = String(props.amount || 0);

  const targetMontant = parseFloat(
    amountAsString.replace(/\s/g, "").replace(",", ".")
  );

  const validTargetMontant = isNaN(targetMontant) ? 0 : targetMontant;

  let ringColor = "";
  if (props.type === "Expense") {
    ringColor = "ring-red-500";
  } else if (props.type === "Revenue") {
    ringColor = "ring-green-500";
  } else if (props.type === "State") {
    ringColor = validTargetMontant >= 0 ? "ring-green-500" : "ring-red-500";
  }

  useEffect(() => {
    let startMontant = previousMontant;
    const duration = 200;
    const stepTime = 10;

    const difference = validTargetMontant - previousMontant;
    const incrementMontant = difference / (duration / stepTime);

    const timer = setInterval(() => {
      startMontant += incrementMontant;
      if (
        (incrementMontant > 0 && startMontant >= validTargetMontant) ||
        (incrementMontant < 0 && startMontant <= validTargetMontant)
      ) {
        setCurrentMontant(validTargetMontant);
        clearInterval(timer);
      } else {
        setCurrentMontant(Math.round(startMontant * 100) / 100);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [validTargetMontant, previousMontant]);

  useEffect(() => {
    setPreviousMontant(currentMontant);
  }, [currentMontant]);

  const formatAmountSign = (amount) => {
    const sign = amount < 0 ? "-" : "";
    const absoluteMontant = Math.abs(amount);

    return (
      sign + absoluteMontant.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    );
  };

  const { theme } = useTheme();
  const bgColor =
    theme === "custom"
      ? "bg-colorPrimaryCustom"
      : "bg-colorPrimaryLight dark:bg-colorPrimaryDark";

  return (
    <div
      className={`w-full flex flex-col-reverse italic gap-10 justify-between font-thin ${bgColor} rounded-2xl ring-[2px] transition-all px-4 py-2 ${ringColor} hover:bg-opacity-95`}
    >
      <div className="flex justify-between">
        <p className="text-xs text-left">{props.title}</p>
        <p className="text-xs text-left">
          En{" "}
          {props.months ? props.months[parseInt(props.selectedMonth) - 1] : ""}{" "}
          {props.selectedYear}
        </p>
      </div>
      <p className="text-2xl">{formatAmountSign(currentMontant)} €</p>
    </div>
  );
}

export default BoxStat;
