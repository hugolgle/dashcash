import { Link } from 'react-router-dom'
import { CirclePlus } from 'lucide-react';

export default function Add() {


    return <>
        <Link to="./add">
            <CirclePlus className="absolute top-4 cursor-pointer hover:scale-125 ease-in-out duration-300" />
        </Link>
    </>
}
