import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/user.action';
import { isConnected } from '../../utils/users';

export default function Navbar(props: any) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = isConnected();

    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');
    const [selectedLogout, setSelectedLogout] = useState(false);
    const [isInactive, setIsInactive] = useState(false);

    const inactivityTime = 15 * 60 * 1000;
    let inactivityTimer: ReturnType<typeof setTimeout>;

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => setIsInactive(true), inactivityTime);
    };

    const handleActivity = () => {
        setIsInactive(false);
        resetInactivityTimer();
    };

    const logout = () => {
        dispatch(logoutUser());
        navigate("/");
        setSelectedLogout(false);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        return () => {
            clearTimeout(inactivityTimer);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, []);

    useEffect(() => {
        if (isInactive) {
            logout();
        }
    }, [isInactive]);

    useEffect(() => {
        const currentPath = location.pathname;
        setActiveLink(currentPath);
    }, [location]);

    return (
        <>
            <section className='flex h-screen w-screen'>
                <div className='sidebar flex flex-col justify-between items-center border-r rounded-r-3xl border-r-zinc-700 w-1/5 h-screen py-10 px-4 bg-zinc-900 fixed transition-all hover:transform-gpu'>
                    <Link to="/" className='font-logo text-2xl w-fit group text-center'>
                        <div className='flex justify-center items-center tracking-tight'>
                            <p className='p-2 bg-white text-zinc-900 group-hover:bg-transparent group-hover:text-white transition-all'>D A $ H</p>
                            <p className='p-2 bg-transparent text-white group-hover:bg-white group-hover:text-zinc-900 transition-all'>B O A R D</p>
                        </div>
                    </Link>

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
                        <Link to="/uyuyu" className={`my-1 py-2 rounded text-nowrap hover:bg-zinc-700 transition-all ${activeLink.startsWith('/dd') ? 'bg-zinc-700' : 'bg-zinc-800'}`}>Calendrier</Link>

                    </div>
                    <div className='flex flex-col justify-end h-32 w-full'>
                        {isAuthenticated === true && (
                            <Link to="/profil" className={`my-1 py-2 rounded text-nowrap hover:bg-zinc-700 transition-all ${activeLink.startsWith('/profil') ? 'bg-zinc-700' : 'bg-zinc-800'}`}>Profil</Link>
                        )}
                        {isAuthenticated === false ? (
                            <Link
                                to="/connexion"
                                className={`my-1 py-2 rounded text-nowrap hover:bg-zinc-700 transition-all ${activeLink.startsWith('/connexion') ? 'bg-zinc-700' : 'bg-zinc-800'}`}
                            >
                                Connexion
                            </Link>
                        ) : (
                            selectedLogout ? (
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-sm py-1">Êtes-vous sûr ?</p>
                                    <div className="flex justify-center gap-4 w-full">
                                        <div
                                            className="p-1 w-full text-sm border-2 border-red-900 bg-zinc-700 rounded cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95"
                                            onClick={logout}
                                        >
                                            Oui
                                        </div>
                                        <div
                                            className="p-1 w-full text-sm border-2 border-zinc-900 bg-zinc-700 rounded cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95 hover:border-green-900"
                                            onClick={() => setSelectedLogout(false)}
                                        >
                                            Non
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button onClick={() => setSelectedLogout(true)} className='text-base my-1 py-2 bg-zinc-800 rounded hover:bg-zinc-700 transition-all'>Déconnexion</button>
                            )
                        )}
                    </div>

                    <p className='text-xs text-gray-400 absolute bottom-2'>© Hugo Le Galle - DashBoard v2.0.0</p>
                </div>
                <div className='content w-4/5 ml-auto p-4'>
                    <Outlet />
                    {props.children}
                </div>
            </section >
        </>
    )


}
