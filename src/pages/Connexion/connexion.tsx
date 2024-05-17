import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/user.action';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../@/components/ui/button';
import { isConnected } from '../../utils/users';

export default function Connexion() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const messageError = useSelector(state => state.userReducer?.error);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };
  const isConnect = isConnected()

  useEffect(() => {
    if (isConnect) {

      navigate('/');
    }
  }, [isConnect, navigate]);

  return (
    <>
      <h2 className="text-5xl font-thin">S'identifier</h2>
      <form onSubmit={handleLogin} className='flex flex-col justify-center items-center gap-5 px-36 py-10'>
        <div className="flex flex-col">
          <label htmlFor="login" className='mb-2'>Nom d'utilisateur :</label>
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
          <label htmlFor="password" className='mb-2'>Mot de passe :</label>
          <input
            className='w-96 h-10 px-2 rounded-xl'
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button variant="outline" className="rounded-xl w-1/4 hover:border-blue-500" type="submit">
          Connexion
        </Button>
      </form>
      <div className='flex flex-col justify-center items-center gap-2 px-36'>
        <p className='text-xs'>Nouveau sur DashBoard ?</p>
        <Link to="/inscription" className="rounded-xl bg-transparent border-2 border-zinc-700  py-2 text-sm px-4 transition-all hover:bg-zinc-700" type="submit">
          Créer un compte DashBoard !
        </Link>
      </div>

      {messageError && (
        <div className="absolute animate-[fadeIn_7s_ease-in-out_forwards] bottom-4 right-4 flex justify-center items-center">
          <p className={`p-4 bg-red-900 w-60 rounded ${messageError ? 'opacity-100' : 'hidden'}`}>{messageError}</p>
        </div >
      )}
    </>
  );
}
