import { Link, useLocation } from 'react-router-dom'
import { CirclePlus } from 'lucide-react';

export default function Header(props: any) {
    const location = useLocation()
    const path = location.pathname
    const pathParts = path.split('/');
    const lePath = pathParts[1];
    return (
        <>
            <div className="w-full">
                <h2 className="text-5xl font-thin mb-9">{props.title}</h2>
                <Link to={`/${lePath}/add`}>
                    <CirclePlus className="absolute top-4 cursor-pointer hover:scale-125 ease-in-out duration-300" />
                </Link>
            </div>
        </>
    )


}