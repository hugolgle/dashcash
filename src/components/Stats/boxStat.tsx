function BoxStat(props: any) {

    let borderColor = "";

    if (props.type.includes("Dépense")) {
        borderColor = "ring-red-800";
    } else if (props.type.includes("Recette")) {
        borderColor = "ring-green-800";
    } else if (props.type === "Économie") {
        borderColor = props.montant >= 0 ? "ring-green-800" : "ring-red-800";
    }

    return (
        <div className={`w-full flex flex-col-reverse gap-4 justify-between bg-zinc-900 rounded-2xl hover:bg-opacity-80  transition-all px-4 py-2 ring-2 ring-inset ${borderColor}`} >
            <div className="flex justify-between">
                <p className="text-xs text-left italic">{props.type}/Mois</p>
                <p className="text-xs text-left italic">En {props.selectedYear}</p>
            </div>
            <p className="text-4xl">{props.montant} {props.type === "Économie" && "€"}</p>
        </div>
    )
}

export default BoxStat