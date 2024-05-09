import { Link, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function Navbar() {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const currentPath = location.pathname;
        setActiveLink(currentPath);
    }, [location]);

    return (
        <>
            <div className='flex h-screen w-screen'>
                <div className='sidebar flex flex-col justify-between items-center border-r border-r-zinc-700 w-1/5 h-screen py-10 px-4 bg-zinc-900 fixed'>
                    <Link to="/" className='font-logo text-3xl w-fit text-center'>DASHCASH</Link>

                    <div className='flex flex-col justify-between gap-4 w-full'>

                        <Link to="/tdb" className={`my-1 py-2 rounded text-nowrap hover:bg-zinc-700 transition-all ${activeLink.startsWith('/tdb') ? 'bg-zinc-700' : 'bg-zinc-800'}`}>Tableau de bord</Link>

                        <div className='flex flex-col'>
                            <Link to="/depense" className={`my-1 py-2 rounded hover:bg-zinc-700 transition-all ${activeLink.startsWith('/depense') ? 'bg-zinc-700' : 'bg-zinc-800'}`}>Dépenses</Link>
                            <Link to="/recette" className={`my-1 py-2 rounded hover:bg-zinc-700 transition-all ${activeLink.startsWith('/recette') ? 'bg-zinc-700' : 'bg-zinc-800'}`}>Recettes</Link>
                        </div>

                        <div className='flex flex-col'>
                            <Link to="/epargn" className={`my-1 py-2 rounded text-nowrap hover:bg-zinc-700 transition-all ${activeLink.startsWith('/epargn') ? 'bg-zinc-700' : 'bg-zinc-800'}`}>Épargne</Link>
                            <Link to="/invest" className={`my-1 py-2 rounded text-nowrap hover:bg-zinc-700 transition-all ${activeLink.startsWith('/invest') ? 'bg-zinc-700' : 'bg-zinc-800'}`}>Investissement</Link>
                        </div>

                        <Link to="/stat" className={`my-1 py-2 rounded text-nowrap hover:bg-zinc-700 transition-all ${activeLink.startsWith('/stat') ? 'bg-zinc-700' : 'bg-zinc-800'}`}>Statistiques</Link>

                    </div>

                    <div className='flex flex-col justify-end h-32  w-full'>
                        <Link to="/profil" className='my-1 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all'>Profil</Link>
                        <Link to="/connexion" className='my-1 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all'>Connexion</Link>
                    </div>

                </div>
                <div className='content w-4/5 ml-auto'>
                    <div className='p-4 h-full w-full'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )


}
