import { Button } from "../../../@/components/ui/button.tsx"
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center h-full gap-14">
            <h1>Bienvenue sur <span className="font-logo">DA$HBOARD</span> !</h1>
            <Button variant={"ghost"} size={"lg"} className="rounded"><Link to="/connexion">Connectez-vous !</Link></Button>
        </div>
    )
}
