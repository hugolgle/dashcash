
import { useLocation } from "react-router-dom";


export default function Transaction() {

    const location = useLocation()
    const path = location.pathname
    const pathParts = path.split('/');
    const firstPart = pathParts[1];
    const title = firstPart.charAt(0).toUpperCase() + firstPart.slice(1);

    return <>
        <h1>
            La transaction {title}
        </h1>
    </>
}