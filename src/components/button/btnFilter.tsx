import { Filter } from 'lucide-react'

function BtnFilter(props: any) {





    return <>
        <div className='flex flex-col'>
            <Filter className="cursor-pointer hover:scale-110 transition-all" onClick={props.action} />
            {props.check > 0 ? <>
                <span className='absolute ml-4 -top-1 text-xs bg-red-500 rounded-full px-1'>{props.check}</span>
            </> : ""}
            {props.children}
        </div>

    </>

}

export default BtnFilter