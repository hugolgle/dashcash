import { Link, Outlet } from 'react-router-dom'

export default function Navbar() {
    return <>
        <div className='flex flex-col justify-between items-center h-screen w-auto py-10 bg-zinc-900'>
            <Link to="/">DASHCASH</Link>

            <div className='flex flex-col'>
                <Link to="/depense" className='mx-4 my-1 px-20 bg-zinc-800 rounded hover:bg-zinc-700 transition-all'>Dépense</Link>
                <Link to="/recette" className='mx-4 my-1 px-20 bg-zinc-800 rounded hover:bg-zinc-700 transition-all'>Recette</Link>
            </div>

            <Link to="/">Connexion</Link>
        </div>
        <div className='container my-4'><Outlet /></div>
    </>
}
