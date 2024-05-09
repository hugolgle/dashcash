

import LayoutRD from "../../layout/layoutRD";

import { Link, useLocation } from 'react-router-dom'
import { CirclePlus } from 'lucide-react';
import Path from '../../utils/utils';

export default function Depense() {
    const location = useLocation()
    const lUrl = Path(location)
    return <>
        <div className="w-full">
            <h2 className="text-5xl font-thin mb-9">Dépenses</h2>
            <Link to={`/${lUrl}/add`}>
                <CirclePlus className="absolute top-4 right-4 cursor-pointer hover:scale-125 ease-in-out duration-300" />
            </Link>
        </div>
        <LayoutRD />
    </>

}
