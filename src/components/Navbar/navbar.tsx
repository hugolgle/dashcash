import { Link, Outlet, useLocation } from 'react-router-dom'

import { useEffect, useState } from 'react';

export default function Navbar() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        // Obtenez le chemin de la page actuelle
        const currentPath = location.pathname;

        // Mettez à jour l'état du lien actif
        setActiveLink(currentPath);
    }, [location]);

    return <>
        <div className='px-0 mx-0 flex h-screen w-screen'>

            <div className='sidebar flex flex-col justify-between border-r border-r-zinc-700 w-1/4 py-10 px-4 bg-zinc-900'>
                <Link to="/" className='font-logo text-3xl'>DASHCASH</Link>
                <div className='flex flex-col'>
                    <Link to="/tableaudebord" className={`my-1 py-2 bg-zinc-800 rounded text-nowrap hover:bg-zinc-700 transition-all ${activeLink === '/tableaudebord' && 'bg-zinc-700'}`}>Tableau de bord</Link>
                    <Link to="/depense" className={`my-1 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all ${activeLink === '/depense' && 'bg-zinc-700'}`}>Dépenses</Link>
                    <Link to="/recette" className={`my-1 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all ${activeLink === '/recette' && 'bg-zinc-700'}`}>Recettes</Link>
                    <Link to="/statistique" className={`my-1 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all ${activeLink === '/statistique' && 'bg-zinc-700'}`}>Statistiques</Link>
                </div>
                <div className='flex flex-col justify-end h-32 '>
                    <Link to="/profil" className='my-1 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all'>Profil</Link>
                    <Link to="/connexion" className='my-1 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all'>Connexion</Link>
                </div>
            </div>
            <div className='content w-3/4 m-4'><Outlet /></div>
        </div>
    </>
}
