import { Link } from "react-router-dom"

export default function TableauDeBord() {

  return <>
    <h2 className="text-5xl font-thin mb-9">Tableau de bord</h2>
    <section className=" flex flex-col gap-4">



      <div className="flex flex-row gap-4  w-full">
        <div className="flex flex-col justify-between items-center w-full h-80 bg-zinc-900 rounded-2xl transition-all p-2">
          <h2 className="text-2xl">Dépenses</h2>
          <div className="flex flex-row justify-evenly items-center w-full">
            <div className="w-1/3 rounded-xl bg-zinc-800 p-2 gap-2 flex flex-col">
              CAMEMBERT

            </div>
            <div className="w-1/3 rounded-xl bg-zinc-800 p-2 gap-2 flex flex-col">
              <p>* </p>
              <p>* </p>
              <p>* </p>
            </div>
          </div>
          <Link to="/depense" className="bg-zinc-700 w-1/2 py-2 rounded-xl transition-all border-2 border-transparent hover:border-blue-600">Voir mes dépenses</Link>
        </div>
        <div className="flex flex-col justify-between items-center w-full h-80 bg-zinc-900 rounded-2xl transition-all p-2">
          <h2 className="text-2xl">Recettes</h2>
          <div className="flex flex-row justify-evenly items-center w-full">
            <div className="w-1/3 rounded-xl bg-zinc-800 p-2 gap-2 flex flex-col">
              CAMEMBERT

            </div>
            <div className="w-1/3 rounded-xl bg-zinc-800 p-2 gap-2 flex flex-col">
              <p>* </p>
              <p>* </p>
              <p>* </p>
            </div>
          </div>
          <Link to="/recette" className="bg-zinc-700 w-1/2 py-2 rounded-xl transition-all border-2 border-transparent hover:border-blue-600">Voir mes recettes</Link>
        </div>
      </div>
      <div className="flex flex-row gap-4  w-full">
        <div className="flex flex-col justify-between items-center w-full h-80 bg-zinc-900 rounded-2xl transition-all p-2">
          <h2 className="text-2xl">Épargnes</h2>
          <div className="flex flex-row justify-evenly w-full">
            <div className="flex flex-col items-center w-2/5 rounded-xl p-2 bg-zinc-800">
              <h2 className="text-xl">Livret A</h2>
              <hr className="w-1/4" />
              <p>10 000.00 €</p>
            </div>
            <div className="flex flex-col items-center w-2/5 rounded-xl p-2 bg-zinc-800">
              <h2 className="text-xl">LEP</h2>
              <hr className="w-1/4" />
              <p>10 000.00 €</p>
            </div>
          </div>
          <Link to="/epargn" className="bg-zinc-700 w-1/2 py-2 rounded-xl transition-all border-2 border-transparent hover:border-blue-600">Voir mon épargne</Link>
        </div>
        <div className="flex flex-col justify-between items-center w-full h-80 bg-zinc-900 rounded-2xl transition-all p-2">
          <h2 className="text-2xl">Investissements</h2>
          <div className="flex flex-row justify-evenly w-full">
            <div className="w-1/3 rounded-xl bg-zinc-800 p-2">
              <h2 className="text-xl">En cours</h2>
            </div>
            <div className="w-1/3 rounded-xl bg-zinc-800 p-2">
              <h2 className="text-xl">Rendements</h2>
              <p>4%</p>
            </div>
          </div>
          <Link to="/invest" className="bg-zinc-700 w-1/2 py-2 rounded-xl transition-all border-2 border-transparent hover:border-blue-600">Voir mes investissements</Link>
        </div>
      </div>

    </section >
  </>

}
