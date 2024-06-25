import { Link } from 'react-router-dom'

function LinkStat(props: any) {

    const borderColor = props.type.includes("Dépense") ? "ring-red-800" : props.type.includes("Recette") ? "ring-green-800" : "";

    return (
        <Link to={props.link} className={`w-full flex flex-col-reverse gap-4 justify-between bg-zinc-900 rounded-2xl hover:bg-opacity-80 hover:scale-95 transition-all px-4 py-2 ring-2 ring-inset ${borderColor}`}>
            <div className="flex justify-between">
                <p className="text-xs text-left italic">{props.type}</p>
                <p className="text-xs text-left italic">En {props.months[parseInt(props.selectedMonth) - 1]} {props.selectedYear}</p>
            </div>
            <p className="text-4xl">{props.montant}</p>
        </Link>
    )
}

export default LinkStat