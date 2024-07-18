import { Search } from 'lucide-react'

function BtnSearch(props: any) {

    return <>
        <div className='flex flex-row relative'>
            <Search className="cursor-pointer hover:scale-110 transition-all" onClick={props.action} />
            {props.children}
        </div>
    </>
}

export default BtnSearch