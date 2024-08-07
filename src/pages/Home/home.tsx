import { infoUser, isConnected } from '../../utils/users';
import { Link } from 'react-router-dom'

export default function Home() {

    const isAuthenticated = isConnected()
    const userInfo = infoUser()
    return (
        <section className="flex flex-col justify-center items-center h-full gap-14">
            <div>
                <h1 className='font-light'>Bienvenue <span className='font-bold'>{userInfo.pseudo}</span> sur</h1>
                <div className='flex justify-center items-center tracking-tight mt-6 font-logo group'>
                    <p className='p-2 text-6xl bg-transparent dark:bg-white text-zinc-900 dark:text-zinc-900 group-hover:bg-zinc-900 group-hover:dark:bg-transparent group-hover:text-white group-hover:dark:text-white transition-all'>D A $ H</p>
                    <p className='p-2 text-6xl bg-zinc-900 dark:bg-transparent text-white dark:text-white group-hover:bg-transparent group-hover:dark:bg-white group-hover:text-zinc-900 group-hover:dark:text-zinc-900 transition-all'>B O A R D</p>
                </div>
            </div>
            {isAuthenticated ?
                (
                    <Link to="/tdb" className='p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl transition-all hover:bg-zinc-200 hover:dark:bg-zinc-800'>C'est parti !</Link>
                ) : (
                    <Link to="/connexion" className='p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl transition-all hover:bg-zinc-200 hover:dark:bg-zinc-800'>Connectez-vous !</Link>
                )
            }
        </section>
    )
}
