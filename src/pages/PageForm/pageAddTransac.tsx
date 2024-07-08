"use client"

import { Button } from "../../../@/components/ui/button"

import { Link, useLocation } from "react-router-dom"

import { categorieRecette, categorieDepense } from '../../../public/categories.json'

import { Path, formatMontant, getCurrentDate } from '../../utils/fonctionnel';
import { useState } from "react"
import { useDispatch } from "react-redux"

import { addTransactions, getTransactions } from '../../redux/actions/transaction.action';
import { infoUser } from "../../utils/users"
import { categorieSort } from "../../utils/autre"
import BtnReturn from "../../components/button/btnReturn";

export default function PageAddTransac(props: any) {

  const userInfo = infoUser()


  const location = useLocation()
  const lUrl = Path(location, 1);

  const categorieD = categorieSort(categorieDepense)
  const categorieR = categorieSort(categorieRecette)

  const [selectedTitre, setSelectedTitre] = useState('');

  const [selectedCategorie, setSelectedCategorie] = useState('');

  const [selectedAutreCategorie, setSelectedAutreCategorie] = useState('');

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
    setSelectedCategorie("");
    setSelectedAutreCategorie("");
    setSelectedDetail("");
    setSelectedMontant("");
  }

  const handleCategorie = (event: any) => {
    setSelectedCategorie(event.target.value);
  };

  const handleAutreCategorie = (event: any) => {
    setSelectedAutreCategorie(event.target.value);
  };

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

    const postData = {
      user: userInfo.id,
      type: props.type,
      categorie: selectedCategorie,
      autreCategorie: selectedAutreCategorie,
      titre: selectedTitre,
      date: selectedDate,
      detail: selectedDetail,
      montant: formatMontant(selectedMontant, props.type)
    };

    try {
      const response = await dispatch(addTransactions(postData) as any);
      const newOperationId = response.data._id;
      setAddedOperationId(newOperationId)
      dispatch(getTransactions() as any);
      resetForm();

      const transactionDate = new Date(selectedDate);
      const formattedDate = `${transactionDate.getFullYear()}${(transactionDate.getMonth() + 1).toString().padStart(2, '0')}`;
      setAddedOperationDate(formattedDate)
      setMessage(`Votre ${props.type} a été ajouté ! `);

    } catch {
      setMessageError("Une erreur s'est produite lors de l'ajout de l'opération");
    }
  };

  return <>
    <h2 className="text-5xl font-thin">Ajouter une {props.type.toLowerCase()}</h2>
    <div className="absolute top-4 left-4">
      <BtnReturn />
    </div>
    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-5 px-36 py-10'>

      <input className="w-96 h-10 px-2 rounded-xl" value={selectedTitre} type="text" name="" maxLength={50} id="" placeholder="Titre" onChange={(e) => { handleTitre(e); handleInputChange(); }} required />
      <select id='action' value={selectedCategorie} className="w-96 h-10 px-2 rounded-xl" onChange={(e) => { handleCategorie(e); handleInputChange(); }} required>
        <option className="text-slate-400" value="" disabled selected>Entrez la catégorie</option>
        {props.type === "Dépense"
          &&
          categorieD.map(({ name }) => {
            return (
              <option key={name} value={name}>{name}</option>
            );
          })
        }
        {props.type === "Recette"
          &&
          categorieR.map(({ name }) => {
            return (
              <option key={name} value={name}>{name}</option>
            );
          })
        }
      </select>
      {
        selectedCategorie === "Autre" &&

        <input className="w-96 h-10 px-2 rounded-xl" type="text" value={selectedAutreCategorie} name="titre" maxLength={20} id="autreTitre" onChange={(e) => { handleAutreCategorie(e); handleInputChange(); }} placeholder="Entrez une autre categorie" />

      }

      <input value={selectedDate} className="w-96 h-10 px-2 rounded-xl text-slate-400" type="date" name="" id="" onChange={(e) => { handleDateChange(e); handleInputChange(); }} required />

      <textarea value={selectedDetail} className="w-96 h-10 px-2 rounded-xl" name="" id="" placeholder="Détails" maxLength={250} onChange={(e) => { handleDetail(e); handleInputChange(); }} />

      <input value={selectedMontant} className="w-96 h-10 px-2 rounded-xl" type="number" min="0" step="0.01" name="" id="" placeholder="Montant" onChange={(e) => { handleMontant(e); handleInputChange(); }} required />

      <Button variant="outline" className="rounded-xl w-1/4 hover:border-blue-500">Soumettre la {(props.type).toLowerCase()}</Button>
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
