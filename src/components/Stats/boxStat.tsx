function BoxStat(props: any) {

    let borderColor = "";

    if (props.type.includes("Dépense")) {
        borderColor = "ring-red-800";
    } else if (props.type.includes("Recette")) {
        borderColor = "ring-green-800";
    } else if (props.type.includes("Économie") || props.type.includes("Déficit")) {
        borderColor = parseFloat(props.montant) >= 0 ? "ring-green-800" : "ring-red-800";
    }

    return (
        <div className={`w-full flex flex-col-reverse gap-10 justify-between font-thin bg-zinc-100 dark:bg-zinc-900 rounded-2xl hover:bg-opacity-80  transition-all px-4 py-2 ring-2 ring-inset ${borderColor}`} >
            <div className="flex justify-between">
                <p className="text-xs text-left italic">{props.type}</p>
                <p className="text-xs text-left italic">En {props.months ? props.months[parseInt(props.selectedMonth) - 1] : ""} {props.selectedYear}</p>
            </div>
            <p className="text-3xl">
                {props.montant} {(props.type.includes("Économie") || props.type.includes("Déficit")) && "€"}
            </p>
        </div>
    )
}

export default BoxStat