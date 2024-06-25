import { CircleArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function BtnReturn() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <CircleArrowLeft className="cursor-pointer hover:scale-125 ease-in-out duration-300" onClick={handleGoBack} />
    )
}

export default BtnReturn