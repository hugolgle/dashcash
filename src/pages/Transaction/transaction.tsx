
import { useParams } from "react-router-dom";


export default function Transaction() {

    const { id } = useParams()

    return <>
        <h1>
            La transaction d'id {id?.substring(4, 8)}
        </h1>
    </>
}