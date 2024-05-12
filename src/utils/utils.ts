import { useSelector } from "react-redux";

const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];

// ------------------------------  Fonctionnel
export default function Path(lePath: any) {
    if (lePath && lePath.pathname) {
        const path = lePath.pathname;
        const pathParts = path.split('/');
        return pathParts[1];
    } else {
        return null;
    }
}

export function convertDate(code: any) {
    const annee = code.substring(0, 4);
    const moisNumero = parseInt(code.substring(4), 10);

    const nomMois = months[moisNumero - 1];

    return nomMois + " " + annee;
}

export function formatDate(date: any) {

    const [year, month, day] = date.split("-");
    const monthIndex = parseInt(month, 10) - 1;

    return `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
}

// ------------------------------  À props des opérations 
export function getOperationsByType(type: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    if (type) {
        return operations.filter((operation: any) => operation.type === type);
    } else {
        return operations;
    }
}

export function getOperationsByMonth(month: any, type: any) {
    const targetMonth = `${month.slice(0, 4)}-${month.slice(4)}`;

    const operations = useSelector((state: any) => state.operationReducer || []);

    let operationsInMonth = operations.filter((operation: any) => {
        const operationDate = operation.date.split('T')[0];
        const operationMonth = operationDate.slice(0, 7);

        return operationMonth === targetMonth;
    });

    if (type) {
        operationsInMonth = operationsInMonth.filter((operation: any) => operation.type === type);
    }

    return operationsInMonth;
}



export function getOperationsByYear(year: any, type: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    let operationsInYear = operations.filter((operation: any) => {
        const operationYear = operation.date.slice(0, 4);

        return operationYear === year;
    });

    if (type) {
        operationsInYear = operationsInYear.filter((operation: any) => operation.type === type);
    }

    return operationsInYear;
}
