import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../../@/components/ui/button";
import { Link } from "react-router-dom";
import { getCurrentDate, separateMillier } from "../../utils/fonctionnel";
import { infoUser } from "../../utils/users";
import { addSubscriptions, getSubscriptions } from "../../redux/actions/subscription.action";
import BtnReturn from "../../components/button/btnReturn";

export default function PageAddSubscription() {
  const userInfo = infoUser();
  const [selectedTitre, setSelectedTitre] = useState("");
  const [selectedDetail, setSelectedDetail] = useState("");
  const [selectedMontant, setSelectedMontant] = useState('');
  const [selectedRecurrence, setSelectedRecurrence] = useState('');
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = () => {
    setMessage("");
    setMessageError("");
  };

  const resetForm = () => {
    setSelectedDetail("");
    setSelectedTitre("");
    setSelectedMontant("");
  };

  const handleDetail = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedDetail(event.target.value);
  };

  const handleTitre = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitre(event.target.value);
  };

  const handleMontant = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMontant(event.target.value);
  };

  const handleRecurrence = (event: any) => {
    setSelectedRecurrence(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postData = {
      user: userInfo.id,
      titre: selectedTitre,
      detail: selectedDetail,
      montant: separateMillier(selectedMontant),
      recurrence: selectedRecurrence,
    };

    try {
      await dispatch(addSubscriptions(postData) as any);
      dispatch(getSubscriptions() as any);
      resetForm();
      setMessage("Votre investissement a été ajouté !");
    } catch {
      setMessageError("Une erreur s'est produite lors de l'ajout de l'opération");
    }
  };

  return (
    <>
      <h2 className="text-5xl font-thin">Ajouter un abonnement</h2>
      <div className="absolute top-4 left-4">
        <BtnReturn />
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-5 px-36 py-10'>
        <input
          className="w-96 h-10 px-2 rounded-xl"
          value={selectedTitre}
          type="text"
          maxLength={50}
          placeholder="Titre"
          onChange={(e) => { handleTitre(e); handleInputChange(); }}
          required
        />
        <textarea
          value={selectedDetail}
          className="w-96 h-10 px-2 rounded-xl"
          maxLength={250}
          placeholder="Détails"
          onChange={(e) => { handleDetail(e); handleInputChange(); }}
        />
        <input
          value={selectedMontant}
          className="w-96 h-10 px-2 rounded-xl"
          type="number"
          min="0"
          step="0.01"
          placeholder="Montant"
          onChange={(e) => { handleMontant(e); handleInputChange(); }}
          required
        />
        <select id='action' value={selectedRecurrence} className="w-96 h-10 px-2 rounded-xl" onChange={(e) => { handleRecurrence(e); handleInputChange(); }} required>
          <option className="text-slate-400" value="" disabled selected>Entrez la réccurence</option>

          <option key="Tous les mois" value="Tous les mois">Tous les mois</option>
          <option key="Toutes les 4 semaines" value="Toutes les 4 semaines">Toutes les 4 semaines</option>

        </select>
        <Button variant="outline" className="rounded-xl w-1/4 hover:border-blue-500">Soumettre</Button>
      </form>
      {message || messageError ? (
        <div className="absolute animate-[fadeIn2_0.3s_ease-in-out_forwards] bottom-4 right-4 flex justify-center items-center">
          <p className={`p-4 bg-lime-900 w-60 rounded ${message ? 'opacity-100' : 'hidden'}`}>
            {message} <Link to="/dashboard" className="underline transition-all hover:text-zinc-950">Allez-y !</Link>
          </p>
          <p className={`p-4 bg-red-900 w-60 rounded ${messageError ? 'opacity-100' : 'hidden'}`}>{messageError}</p>
        </div>
      ) : null}
    </>
  );
}
