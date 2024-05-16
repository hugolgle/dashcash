import { infoUser, isConnected } from '../../utils/users';
import { Link } from 'react-router-dom'

export default function Home() {

    const isAuthenticated = isConnected()
    const userInfo = infoUser()
    return (
        <div className="flex flex-col justify-center items-center h-full gap-14">
            <h1>Bienvenue {userInfo.prenom} sur <span className="font-logo">DA$HBOARD</span> !</h1>
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
