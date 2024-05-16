import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/actions/user.action';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../@/components/ui/button';

export default function Connexion() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
    navigate('/');
  };

  return (
    <>
      <h2 className="text-5xl font-thin">Connexion</h2>
      <form onSubmit={handleLogin} className='flex flex-col justify-center items-center gap-5 px-36 py-10'>
        <div className="flex flex-col">
          <label htmlFor="login">Nom d'utilisateur:</label>
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
          <label htmlFor="password">Mot de passe:</label>
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
    </>
  );
}
