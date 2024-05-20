import { useNavigate } from "react-router-dom";

import { formatDate } from "../../utils/fonctionnel";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { infoUser } from "../../utils/users";
import { deleteUser, editUser } from "../../redux/actions/user.action";


export default function Profil() {
  const userInfo = infoUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedDelete, setSelectedDelete] = useState(false);

  const handleDeleteConfirmation = async () => {
    const confirmed = window.confirm("Cette action est irréversible ?");
    if (confirmed) {
      await dispatch(deleteUser(userInfo.id) as any);
      navigate("/");
    } else {
      setSelectedDelete(false)
    }
  };

  const [selectedUpdate, setSelectedUpdate] = useState(false);
  const [update, setUpdate] = useState(false);

  const [prenom, setPrenom] = useState(userInfo?.prenom ?? '');
  const [nom, setNom] = useState(userInfo?.nom ?? '');
  const [username, setUsername] = useState(userInfo?.username ?? '');
  const [pseudo, setPseudo] = useState(userInfo?.pseudo ?? '');
  const [message, setMessage] = useState(null);

  const handleInputChange = () => {
    setMessage(null);
    setUpdate(true);
  };

  const handleUpdateConfirmation = async (e: any) => {
    e.preventDefault();
    const postData = {
      _id: userInfo.id,
      username: username,
      pseudo: pseudo,
      nom: nom,
      prenom: prenom,
    }

    try {
      await dispatch(editUser(postData));
      setSelectedUpdate(false)
      setMessage("Modification effectué !");
    } catch (err) {
      setMessage("Modification échoué !");
    }
  };

  return <>

    <div className="w-full h-auto relative">
      <h2 className="text-5xl font-thin mb-9">Profil</h2>
    </div>

    <section className=" flex flex-row gap-4">
      <div className=" flex-col w-3/4 py-12 bg-zinc-900 flex justify-start items-center rounded-2xl gap-6">
        <div className="rounded-full bg-slate-500 w-32 h-32">
          <p>PP</p>
        </div>
        <div>
          <p>Prénom :</p>
          {selectedUpdate ? (<input type="text" value={prenom} className="p-2 bg-transparent rounded border-1 border-blue-800 animate-[pulseEdit_1s_ease-in-out_infinite]" onChange={(e) => { setPrenom(e.target.value); handleInputChange(); }} required />
          ) : (
            <p className=""><b>{userInfo.prenom}</b></p>)}
        </div>
        <div>
          <p>Nom :</p>
          {selectedUpdate ? (<input type="text" value={nom} className="p-2 bg-transparent rounded border-1 border-blue-800 animate-[pulseEdit_1s_ease-in-out_infinite]" onChange={(e) => { setNom(e.target.value); handleInputChange(); }} required />
          ) : (
            <p className=""><b>{userInfo.nom}</b></p>)}
        </div>
        <div>
          <p>Nom d'utilisateur :</p>
          {selectedUpdate ? (<input type="text" value={username} className="p-2 bg-transparent rounded border-1 border-blue-800 animate-[pulseEdit_1s_ease-in-out_infinite]" onChange={(e) => { setUsername(e.target.value); handleInputChange(); }} required />
          ) : (
            <p className=""><b>{userInfo.username}</b></p>)}
        </div>
        <div>
          <p>Pseudo :</p>
          {selectedUpdate ? (<input type="text" value={pseudo} className="p-2 bg-transparent rounded border-1 border-blue-800 animate-[pulseEdit_1s_ease-in-out_infinite]" onChange={(e) => { setPseudo(e.target.value); handleInputChange(); }} required />
          ) : (
            <p className=""><b>{userInfo.pseudo}</b></p>)}
        </div>
        <div>
          <p>Inscript le :</p>

          <p className=""><b>{formatDate(userInfo.date)}</b></p>
        </div>
      </div>

      <div className="flex flex-col w-3/4 gap-4">
        {selectedDelete ? (
          <div className="flex flex-col gap-4 h-40 justify-center items-center">
            <p className="text-sm">Êtes-vous sûr ?</p>
            <div className="flex gap-4">
              <div className="p-8 border-2 border-red-900 bg-zinc-900 rounded-2xl cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95" onClick={handleDeleteConfirmation}>Oui</div>
              <div className="p-8 border-2 border-zinc-900 bg-zinc-900 rounded-2xl cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95 hover:border-green-900" onClick={() => setSelectedDelete(false)}>Non</div>
            </div>
          </div>
        ) : (
          <div className={`h-40 w-full cursor-pointer bg-zinc-900 flex justify-center items-center rounded-2xl hover:bg-opacity-80 transition-all hover:scale-95`} onClick={() => setSelectedDelete(true)}>Supprimer mon compte</div>
        )}

        {selectedUpdate && update === true ? (
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="text-sm">Êtes-vous sûr de vouloir modifier ?</p>
            <div className="flex gap-4">
              <div className="p-8 border-2 border-red-900 bg-zinc-900 rounded-2xl cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95" onClick={handleUpdateConfirmation}>Oui</div>
              <div className="p-8 border-2 border-zinc-900 bg-zinc-900 rounded-2xl cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95 hover:border-green-900" onClick={() => setSelectedUpdate(false)}>Non</div>
            </div>
          </div>
        ) : selectedUpdate ? (
          <div className="p-8 h-32 bg-zinc-900 rounded-2xl flex justify-center items-center hover:bg-opacity-80 cursor-pointer transition-all hover:scale-95" onClick={() => setSelectedUpdate(false)}>Annuler</div>
        ) : (
          <div className="p-8 h-32 bg-zinc-900 rounded-2xl flex justify-center items-center hover:bg-opacity-80 cursor-pointer transition-all hover:scale-95" onClick={() => setSelectedUpdate(true)}>Modifier</div>
        )}

        <div className={`h-40 w-full bg-zinc-900 flex justify-center items-center rounded-2xl`}>


        </div>
        <div className={`h-40 w-full bg-zinc-900 flex justify-center items-center rounded-2xl`}>


        </div>
      </div>
      {message ? (
        <div className={`absolute bottom-4 right-4 flex justify-center transition-all items-center animate-[fadeIn_7s_ease-in-out_forwards]`}>
          <p className="p-4 bg-lime-900 w-60 rounded shadow-2xl shadow-black">
            {message}
          </p>
        </div>
      ) : null}

    </section >
  </>
}