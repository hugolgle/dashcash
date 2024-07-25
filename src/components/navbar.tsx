import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/user.action';
import { isConnected } from '../utils/users';
import { BtnTheme } from './button/btnTheme';
import { BarChart, ChevronLeft, Euro, HandCoins, LayoutDashboard, Power, PowerOff, User, UserRound, Wallet2, WalletCards } from 'lucide-react';

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

    const [wrapMenu, setWrapMenu] = useState(false);


    const handleWrap = () => {
        setWrapMenu(!wrapMenu)
    }

    return (
        <>
            <section className='flex h-screen w-screen'>

                <div className={`sidebar flex flex-col justify-between overflow-auto rounded-r-[18px] items-center  h-screen py-10 px-4 bg-zinc-100 dark:bg-zinc-900 fixed ease-linear duration-300 ${wrapMenu ? "w-1/12" : "w-1/5"}`}>
                    <Link to="/" className='font-logo cursor-pointer text-2xl group text-center w-auto overflow-hidden'>
                        <div className='flex justify-center items-center cursor-pointer tracking-tight'>
                            <p className='p-2 bg-transparent dark:bg-white cursor-pointer text-zinc-900 dark:text-zinc-900 group-hover:bg-zinc-900 text-nowrap group-hover:dark:bg-transparent group-hover:text-white group-hover:dark:text-white transition-all'>{wrapMenu ? "D" : "D A S H"}</p>
                            <p className='p-2 bg-zinc-900 dark:bg-transparent cursor-pointer text-white dark:text-white group-hover:bg-transparent text-nowrap group-hover:dark:bg-white group-hover:text-zinc-900 group-hover:dark:text-zinc-900 transition-all'>{wrapMenu ? "B" : "B O A R D"}</p>
                        </div>
                    </Link>
                    <BtnTheme />

                    <div
                        className='bg-zinc-200 dark:bg-zinc-800 flex items-center w-10 h-10 justify-center cursor-pointer rounded-full hover:bg-opacity-50 hover:scale-105 hover:dark:bg-opacity-50 overflow-hidden transition-all'
                        onClick={handleWrap}
                    >
                        <ChevronLeft className={`ease-linear duration-300 ${wrapMenu ? "rotate-180" : ""}`} />
                    </div>

                    <div className={`flex flex-col justify-between ${wrapMenu ? " items-center" : ""} gap-4 w-full`}>
                        <Link to="/tdb" className={`my-1 py-2 rounded text-nowrap hover:bg-opacity-50 hover:dark:bg-opacity-50 overflow-hidden transition-all ${wrapMenu ? "flex justify-center bg-transparent w-10 h-10" : ""} ${activeLink.startsWith('/tdb') ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-200 dark:bg-zinc-800'}`}>{wrapMenu ? <><LayoutDashboard /></> : "Tableau de bord"}</Link>
                        <div className='flex flex-col'>
                            <Link to="/depense" className={`my-1 py-2 rounded hover:bg-opacity-50 hover:dark:bg-opacity-50 overflow-hidden transition-all ${wrapMenu ? "flex justify-center bg-transparent w-10 h-10" : ""} ${activeLink.startsWith('/depense') ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-200 dark:bg-zinc-800'}`}>{wrapMenu ? <><WalletCards /></> : "Dépenses"}</Link>
                            <Link to="/recette" className={`my-1 py-2 rounded hover:bg-opacity-50 hover:dark:bg-opacity-50 overflow-hidden transition-all ${wrapMenu ? "flex justify-center bg-transparent w-10 h-10" : ""} ${activeLink.startsWith('/recette') ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-200 dark:bg-zinc-800'}`}>{wrapMenu ? <><Euro /></> : "Recettes"}</Link>
                        </div>
                        <div className='flex flex-col'>
                            <Link to="/invest" className={`my-1 py-2 rounded text-nowrap hover:bg-opacity-50 hover:dark:bg-opacity-50 overflow-hidden transition-all ${wrapMenu ? "flex justify-center bg-transparent w-10 h-10" : ""} ${activeLink.startsWith('/invest') ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-200 dark:bg-zinc-800'}`}>{wrapMenu ? <><HandCoins /></> : "Investissement"}</Link>
                        </div>
                        <Link to="/stat" className={`my-1 py-2 rounded text-nowrap hover:bg-opacity-50 hover:dark:bg-opacity-50 overflow-hidden transition-all ${wrapMenu ? "flex justify-center bg-transparent w-10 h-10" : ""} ${activeLink.startsWith('/stat') ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-200 dark:bg-zinc-800'}`}>{wrapMenu ? <><BarChart /></> : "Statistique"}</Link>
                    </div>

                    <div className={`flex flex-col justify-end ${wrapMenu ? " items-center" : ""} h-32 w-full`}>
                        {isAuthenticated === true && (
                            <Link to="/profil" className={`my-1 py-2 rounded text-nowrap hover:bg-opacity-50 hover:dark:bg-opacity-50 overflow-hidden transition-all ${wrapMenu ? "flex justify-center bg-transparent w-10 h-10" : ""} ${activeLink.startsWith('/profil') ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-200 dark:bg-zinc-800'}`}>{wrapMenu ? <><UserRound /></> : "Profil"}</Link>
                        )}
                        {isAuthenticated === false ? (
                            <Link
                                to="/connexion"
                                className={`my-1 py-2 rounded text-nowrap bg-green-500 dark:bg-green-500 hover:bg-opacity-50 hover:dark:bg-opacity-50 overflow-hidden transition-all ${wrapMenu ? "flex justify-center bg-transparent w-10 h-10" : ""} ${activeLink.startsWith('/connexion') ? 'bg-zinc-300 dark:bg-zinc-700' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                            >
                                {wrapMenu ? <><Power /></> : "Connexion"}
                            </Link>
                        ) : (
                            selectedLogout ? (
                                <div className="flex flex-col justify-center items-center">
                                    <p className="text-sm py-1">Êtes-vous sûr ?</p>
                                    <div className="flex justify-center gap-4 w-full">
                                        <div
                                            className="p-1 w-full text-sm border-2 border-red-900 bg-opacity-20 rounded cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95"
                                            onClick={logout}
                                        >
                                            Oui
                                        </div>
                                        <div
                                            className="p-1 w-full text-sm border-2 border-zinc-900 bg-opacity-20 rounded cursor-pointer flex justify-center items-center transition-all hover:bg-opacity-80 hover:scale-95 hover:border-green-900"
                                            onClick={() => setSelectedLogout(false)}
                                        >
                                            Non
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div onClick={() => setSelectedLogout(true)} className={`my-1 py-2 rounded bg-red-500 dark:bg-red-500 cursor-pointer text-nowrap dark:text-slate-50 hover:bg-opacity-50 hover:dark:bg-opacity-50 overflow-hidden transition-all ${wrapMenu ? "flex justify-center w-10 h-10" : ""}`}>{wrapMenu ? <><PowerOff /></> : "Déconnexion"}</div>
                            )
                        )}
                    </div>


                    <p className='text-xs text-gray-400 absolute bottom-2'>{wrapMenu ? "© HLG - DB v2.0.0" : "© Hugo Le Galle - DashBoard v2.0.0"}</p>
                </div>

                <div className={`relative content ml-auto ease-linear duration-300 p-4 ${wrapMenu ? "w-11/12" : "w-4/5"}`}>
                    <Outlet />
                    {props.children}
                </div>
            </section >
        </>
    )


}
