import { infoUser, isConnected } from '../../utils/users';
import { Link } from 'react-router-dom'

export default function Home() {

    const isAuthenticated = isConnected()
    const userInfo = infoUser()
    return (
        <div className="flex flex-col justify-center items-center h-full gap-14">
            <h1>Bienvenue {userInfo.prenom} sur
                <div className='flex justify-center items-center tracking-tight mt-6 font-logo group'>
                    <p className='p-2 bg-white text-fontBg group-hover:bg-transparent group-hover:text-white transition-all'>D A $ H</p>
                    <p className='p-2 bg-transparent text-white group-hover:bg-white group-hover:text-fontBg transition-all'>B O A R D</p>
                </div>
            </h1>
            {isAuthenticated ?
                (
                    <Link to="/tdb" className='p-4 bg-zinc-700 rounded-xl transition-all hover:bg-slate-600'>C'est parti !</Link>
                ) : (
                    <Link to="/connexion" className='p-4 bg-zinc-700 rounded-xl transition-all hover:bg-slate-600'>Connectez-vous !</Link>
                )
            }
        </div>
    )
}
