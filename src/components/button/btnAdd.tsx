import { CirclePlus } from 'lucide-react'
import { Link } from 'react-router-dom'

function BtnAdd(props: any) {
    return (
        <Link className='cursor-pointer hover:scale-110 transition-all' to={props.to ? `${props.to}/add` : "add"}><CirclePlus /></Link>
    )
}

export default BtnAdd