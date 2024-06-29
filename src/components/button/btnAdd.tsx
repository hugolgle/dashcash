import { CirclePlus } from 'lucide-react'
import { Link } from 'react-router-dom'

function BtnAdd(props: any) {
    return (
        <Link className='cursor-pointer hover:scale-105 transition-all' to={props.to ? `${props.to}/add` : "add"}><CirclePlus className="hover:scale-125 ease-in-out duration-300" /></Link>
    )
}

export default BtnAdd