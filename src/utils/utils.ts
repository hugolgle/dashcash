

export default function Path(lePath: any) {
    if (lePath && lePath.pathname) {
        const path = lePath.pathname;
        const pathParts = path.split('/');
        return pathParts[1];
    } else {
        // Gérer le cas où lePath ou lePath.pathname est undefined
        return null; // ou une autre valeur par défaut selon votre logique
    }
}

import { useSelector } from "react-redux";


export function getAllOperations() {
    const operations = useSelector((state: any) => state.operationReducer || []);
    return operations;
}

export function getOperationsByType(type: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);
    return operations.filter((x: any) => x.type === type);
}

export function getOperationsByDate(month: any, year: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);
    const filteredOperations = operations.filter((operation: any) => {
        // Convertir la date de l'opération en un objet Date
        const operationDate = new Date(operation.date);

        // Comparer le mois et l'année de l'opération avec ceux spécifiés
        return operationDate.getMonth() + 1 === month && operationDate.getFullYear() === year;
    });

    return filteredOperations;
}

