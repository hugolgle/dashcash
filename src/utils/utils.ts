import { useSelector } from "react-redux";


export default function Path(lePath: any) {
    if (lePath && lePath.pathname) {
        const path = lePath.pathname;
        const pathParts = path.split('/');
        return pathParts[1];
    } else {
        return null;
    }
}

export function getOperations() {
    const operations = useSelector((state: any) => state.operationReducer || []);
    return operations;
}