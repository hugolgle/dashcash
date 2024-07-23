"use client"

import { Button } from "../../../@/components/ui/button"

import { Link } from "react-router-dom"

import { getCurrentDate, separateMillier } from '../../utils/fonctionnel';
import { useState } from "react"
import { useDispatch } from "react-redux"

import { infoUser } from "../../utils/users"
import { addInvestments, getInvestments } from "../../redux/actions/investment.action";
import BtnReturn from "../../components/button/btnReturn";

export default function PageAddInvest() {

  const userInfo = infoUser()

  const [selectedPlateforme, setSelectedPlateforme] = useState('TradeRepublic');

  const [selectedDate, setSelectedDate] = useState(getCurrentDate);

  const [selectedType, setSelectedType] = useState("");

  const [selectedTitre, setSelectedTitre] = useState("");

  const [selectedDetail, setSelectedDetail] = useState("");

  const [selectedMontant, setSelectedMontant] = useState('');
  const [addedOperationDate, setAddedOperationDate] = useState("");
  const [addedOperationId, setAddedOperationId] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleInputChange = () => {
    setMessage("");
    setMessageError("");
    setAddedOperationDate("")
    setAddedOperationId("")
  };

  const dispatch = useDispatch()

  const resetForm = () => {
    setSelectedDetail("");
    setSelectedType("");
    setSelectedTitre("");
    setSelectedMontant("");
  }

  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  const handleDetail = (event: any) => {
    setSelectedDetail(event.target.value);
  };

  const handleType = (event: any) => {
    setSelectedType(event.target.value);
  };

  const handleTitre = (event: any) => {
    setSelectedTitre(event.target.value);
  };

  const handlePlateforme = (event: any) => {
    setSelectedPlateforme(event.target.value);
  };

  const handleMontant = (event: any) => {
    setSelectedMontant(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const postData = {
      user: userInfo.id,
      plateforme: selectedPlateforme,
      type: selectedType,
      titre: selectedTitre,
      detail: selectedDetail,
      date: selectedDate,
      montant: separateMillier(selectedMontant)
    };

    try {
      const response = await dispatch(addInvestments(postData) as any);
      const newOperationId = response.data._id;
      setAddedOperationId(newOperationId)
      dispatch(getInvestments() as any);
      resetForm();

      const transactionDate = new Date(selectedDate);
      const formattedDate = `${transactionDate.getFullYear()}${(transactionDate.getMonth() + 1).toString().padStart(2, '0')}`;
      setAddedOperationDate(formattedDate)
      setMessage("Votre investissement a été ajouté ! ");

    } catch {
      setMessageError("Une erreur s'est produite lors de l'ajout de l'opération");
    }
  };

  return <>
    <section>

      <h2 className="text-5xl font-thin">Ajouter un investissement</h2>

      <div className="absolute top-4 left-4">
        <BtnReturn />
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-5 px-36 py-10'>

        <input className="w-96 h-10 px-2 rounded-xl bg-zinc-100 dark:bg-zinc-900" value={selectedPlateforme} type="text" name="" maxLength={50} placeholder="Plateforme" onChange={(e) => { handlePlateforme(e); handleInputChange(); }} required />

        <input value={selectedDate} className="w-96 h-10 px-2 rounded-xl  bg-zinc-100 dark:bg-zinc-900" type="date" name="" onChange={(e) => { handleDateChange(e); handleInputChange(); }} required />

        <select id='action' value={selectedType} className="w-96 h-10 px-2 rounded-xl bg-zinc-100 dark:bg-zinc-900" onChange={(e) => { handleType(e); handleInputChange(); }} required>
          <option disabled selected>Entrez la catégorie</option>
          <option value="Action">Action</option>
          <option value="ETF">ETF</option>
          <option value="Crypto">Crypto</option>
          <option value="Obligation">Obligation</option>
          <option value="Dérivé">Dérivé</option>
        </select>

        <input className="w-96 h-10 px-2 rounded-xl bg-zinc-100 dark:bg-zinc-900" value={selectedTitre} type="text" name="" maxLength={50} placeholder="Titre" onChange={(e) => { handleTitre(e); handleInputChange(); }} required />

        <textarea value={selectedDetail} className="w-96 h-10 px-2 rounded-xl bg-zinc-100 dark:bg-zinc-900" name="" placeholder="Détails" maxLength={250} onChange={(e) => { handleDetail(e); handleInputChange(); }} />

        <input value={selectedMontant} className="w-96 h-10 px-2 rounded-xl bg-zinc-100 dark:bg-zinc-900" type="number" min="0" step="0.01" name="" placeholder="Montant" onChange={(e) => { handleMontant(e); handleInputChange(); }} required />

        <Button variant="outline" className="rounded-xl w-1/4 bg-zinc-100 dark:bg-zinc-900 hover:border-blue-500">Soumettre</Button>
      </form >
      {message || messageError ? (
        <div className={`absolute animate-[fadeIn2_0.3s_ease-in-out_forwards] bottom-4 right-4 flex justify-center items-center`}>
          <p className={`p-4 bg-lime-900 w-60 rounded ${message ? 'opacity-100' : 'hidden'}`}>
            {message} <Link to={`/invest/operations/${addedOperationId}`} className="underline transition-all hover:text-zinc-950">Allez-y !</Link>
          </p>
          <p className={`p-4 bg-red-900 w-60 rounded ${messageError ? 'opacity-100' : 'hidden'}`}>{messageError}</p>
        </div >
      ) : null
      }
    </section>
  </>
}
