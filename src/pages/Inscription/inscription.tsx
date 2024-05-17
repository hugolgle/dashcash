import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../@/components/ui/button';
import { addUser } from '../../redux/actions/user.action';

export default function Inscription() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleNewUser = async (e: any) => {
    e.preventDefault();


    const postData = {
      username: username,
      password: password,
      pseudo: pseudo,
      nom: nom,
      prenom: prenom,
    }

    try {
      await dispatch(addUser(postData));
      setMessage("Inscription réussi !");
      setUsername("");
      setPassword("");
      setPseudo("");
      setNom("");
      setPrenom("");
    } catch (err) {
      setMessageError("Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <>
      <h2 className="text-5xl font-thin">Inscription</h2>
      <form onSubmit={handleNewUser} className='flex flex-col justify-center items-center gap-5 px-36 py-10'>
        <div className="flex flex-col">
          <label htmlFor="login" className='mb-2'>
            Nom d'utilisateur :
          </label>
          <input
            className='w-96 h-10 px-2 rounded-xl'
            id="login"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className='mb-2'>
            Mot de passe :
          </label>
          <input
            className='w-96 h-10 px-2 rounded-xl'
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="pseudo" className='mb-2'>
            Pseudo :
          </label>
          <input
            className='w-96 h-10 px-2 rounded-xl'
            id="pseudo"
            type="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="nom" className='mb-2'>
            Nom :
          </label>
          <input
            className='w-96 h-10 px-2 rounded-xl'
            id="nom"
            type="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="prenom" className='mb-2'>
            Prénom :
          </label>
          <input
            className='w-96 h-10 px-2 rounded-xl'
            id="prenom"
            type="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>

        <Button variant="outline" className="rounded-xl w-1/4 hover:border-blue-500" type="submit">S'inscrire</Button>
      </form>
      <div className='flex flex-col justify-center items-center gap-2 px-36'>
        <p className='text-xs'>Vous possédez déjà un compte ?</p>
        <Link to="/connexion" className="rounded-xl bg-transparent border-2 border-zinc-700  py-2 text-sm px-4 transition-all hover:bg-zinc-700" type="submit">
          Identifiez-vous !
        </Link>
      </div>

      {message || messageError ? (
        <div className={`absolute animate-[fadeIn2_0.3s_ease-in-out_forwards] bottom-4 right-4 flex justify-center items-center`}>
          <p className={`p-4 bg-lime-900 w-60 rounded ${message ? 'opacity-100' : 'hidden'}`}>
            {message} <Link to={`/connexion`} className="underline transition-all hover:text-zinc-950">Connectez-vous !</Link>
          </p>
          <p className={`p-4 bg-red-900 w-60 rounded ${messageError ? 'opacity-100' : 'hidden'}`}>{messageError}</p>
        </div >
      ) : null
      }
    </>
  );
};