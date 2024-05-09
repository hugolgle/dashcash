
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/header";
import Tableau from "../../components/Tableau/tableau";


export default function Transaction() {

    const location = useLocation()
    const path = location.pathname
    const pathParts = path.split('/');
    const firstPart = pathParts[1];
    const title = firstPart.charAt(0).toUpperCase() + firstPart.slice(1);

    return <>
        <Header title={title} />
        <Tableau />
    </>
}