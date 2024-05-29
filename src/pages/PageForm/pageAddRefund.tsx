"use client"

import { Button } from "../../../@/components/ui/button"

import { Link, useLocation } from "react-router-dom"
import { CircleArrowLeft } from "lucide-react"

import { Path, formatMontant, getCurrentDate, separateMillier } from '../../utils/fonctionnel';
import { useState } from "react"
import { useDispatch } from "react-redux"

import { addTransactions, editTransactions, getTransactions } from '../../redux/actions/transaction.action';
import { infoUser } from "../../utils/users"

export default function PageAddRefund(props: any) {

  const userInfo = infoUser()


  const location = useLocation()
  const lUrl = Path(location, 1);

  const [selectedTitre, setSelectedTitre] = useState('');

  const [selectedDate, setSelectedDate] = useState(getCurrentDate);

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
    setSelectedTitre("");
    setSelectedDetail("");
    setSelectedMontant("");
  }

  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  const handleDetail = (event: any) => {
    setSelectedDetail(event.target.value);
  };

  const handleTitre = (event: any) => {
    setSelectedTitre(event.target.value);
  };

  const handleMontant = (event: any) => {
    setSelectedMontant(event.target.value);
  };


  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const addField = {
      id: props.transactionId,
      // montant: separateMillier(newMontant),
      remboursement: {
        titre: selectedTitre,
        date: selectedDate,
        detail: selectedDetail,
        montant: selectedMontant,
      }
    };

    try {
      await dispatch(editTransactions(addField) as any);
      dispatch(getTransactions() as any);
      setMessage(`Votre remboursement a été ajouté ! `);

    } catch {
      setMessageError("Une erreur s'est produite lors de l'ajout du remboursement");
    }
  };

  return <>

    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-5 px-36 py-10'>

      <input className="w-96 h-10 px-2 rounded-xl" value={selectedTitre} type="text" name="" maxLength={50} id="" placeholder="Titre" onChange={(e) => { handleTitre(e); handleInputChange(); }} required />

      <input value={selectedDate} className="w-96 h-10 px-2 rounded-xl text-slate-400" type="date" name="" id="" onChange={(e) => { handleDateChange(e); handleInputChange(); }} required />

      <textarea value={selectedDetail} className="w-96 h-10 px-2 rounded-xl" name="" id="" placeholder="Détails" maxLength={250} onChange={(e) => { handleDetail(e); handleInputChange(); }} />

      <input value={selectedMontant} className="w-96 h-10 px-2 rounded-xl" type="number" min="-10" step="0.01" name="" id="" placeholder="Montant" onChange={(e) => { handleMontant(e); handleInputChange(); }} required />

      <Button variant="outline" className="rounded-xl w-1/4 hover:border-blue-500">Soumettre le remboursement</Button>
    </form >
    {message || messageError ? (
      <div className={`absolute animate-[fadeIn2_0.3s_ease-in-out_forwards] bottom-4 right-4 flex justify-center items-center`}>
        <p className={`p-4 bg-lime-900 w-60 rounded ${message ? 'opacity-100' : 'hidden'}`}>
          {message} <Link to={`/${lUrl}/${addedOperationDate}/${addedOperationId}`} className="underline transition-all hover:text-zinc-950">Allez-y !</Link>
        </p>
        <p className={`p-4 bg-red-900 w-60 rounded ${messageError ? 'opacity-100' : 'hidden'}`}>{messageError}</p>
      </div >
    ) : null
    }
  </>
}
