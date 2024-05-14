"use client"

import { Button } from "../../../@/components/ui/button"

import { Link, useLocation } from "react-router-dom"
import { CircleArrowLeft } from "lucide-react"

import { categorieRecette, categorieDepense } from '../../../public/categories.json'

import Path, { formatMontant, getCurrentDate } from '../../utils/utils';
import { useState } from "react"
import { useDispatch } from "react-redux"

import { addOperations, getOperations } from '../../redux/actions/operation.action';

export default function PageAdd(props: any) {


  const location = useLocation()
  const lUrl = Path(location, 1);

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
    setMessageError(""); // Réinitialiser le message d'erreur lorsque l'utilisateur commence à modifier un champ
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
      type: props.type,
      categorie: selectedCategorie === "Autre" ? selectedAutreCategorie : selectedCategorie,
      titre: selectedTitre,
      date: selectedDate,
      detail: selectedDetail,
      montant: formatMontant(selectedMontant, props.type)
    };

    try {
      const response = await dispatch(addOperations(postData) as any);
      const newOperationId = response.data._id;
      setAddedOperationId(newOperationId)
      dispatch(getOperations() as any);
      resetForm();

      // Formater la date en AAAAMM
      const operationDate = new Date(selectedDate);
      const formattedDate = `${operationDate.getFullYear()}${(operationDate.getMonth() + 1).toString().padStart(2, '0')}`;
      setAddedOperationDate(formattedDate)
      setMessage(`Votre ${props.type} a été ajouté ! `);

    } catch {
      setMessageError("Une erreur s'est produite lors de l'ajout de l'opération :");
    }
  };



  return <>
    <h2 className="text-5xl font-thin">Ajouter une {props.type}</h2>

    <Link to={`/${lUrl}`}>
      <CircleArrowLeft className="absolute top-4 cursor-pointer hover:scale-125 ease-in-out duration-300" />
    </Link>
    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-5 px-36 py-10'>

      <input className="w-96 h-10 px-2 rounded-xl placeholder:text-slate-400" value={selectedTitre} type="text" name="" id="" placeholder="Titre" onChange={(e) => { handleTitre(e); handleInputChange(); }} required />

      <select id='action' value={selectedCategorie} className="w-96 h-10 px-2 rounded-xl" onChange={(e) => { handleCategorie(e); handleInputChange(); }} required>
        <option className="text-slate-400" value="" disabled selected>Entrez la catégorie</option>
        {props.type === "Dépense"
          &&
          categorieDepense.map(({ name }) => {
            return (
              <option key={name} value={name}>{name}</option>
            );
          })
        }
        {props.type === "Recette"
          &&
          categorieRecette.map(({ name }) => {
            return (
              <option key={name} value={name}>{name}</option>
            );
          })
        }
      </select>
      {
        selectedCategorie === "Autre" &&

        <input className="w-96 h-10 px-2 rounded-xl placeholder:text-slate-400" type="text" value={selectedAutreCategorie} name="titre" id="autreTitre" onChange={(e) => { handleAutreCategorie(e); handleInputChange(); }} placeholder="Entrez une autre categorie" />

      }

      <input value={selectedDate} className="w-96 h-10 px-2 rounded-xl text-slate-400" type="date" name="" id="" onChange={(e) => { handleDateChange(e); handleInputChange(); }} required />

      <input value={selectedDetail} className="w-96 h-10 px-2 rounded-xl placeholder:text-slate-400" type="text" name="" id="" placeholder="Détails" onChange={(e) => { handleDetail(e); handleInputChange(); }} />

      <input value={selectedMontant} className="w-96 h-10 px-2 rounded-xl placeholder:text-slate-400" type="number" name="" id="" placeholder="Montant" onChange={(e) => { handleMontant(e); handleInputChange(); }} required />

      <Button variant="outline" className="rounded-xl w-1/4 hover:border-blue-500">Soumettre la {props.type}</Button>
    </form >
    {message || messageError ? (
      <div className={`absolute ${message || messageError ? 'opacity-100' : 'opacity-0'} bottom-4 right-4 flex justify-center items-center`}>
        <p className={`p-4 bg-lime-900 w-60 rounded ${message ? 'opacity-100' : 'hidden'}`}>
          {message} <Link to={`/${lUrl}/${addedOperationDate}/${addedOperationId}`} className="underline transition-all hover:text-zinc-950">Allez-y !</Link>
        </p>
        <p className={`p-4 absolute bg-red-900 w-60 rounded ${messageError ? 'opacity-100' : 'hidden'}`}>{messageError}</p>
      </div >
    ) : null
    }
  </>
}
