import { useSelector } from "react-redux";

export const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
export const getCurrentDate = `${currentYear}-${month}-${day}`;

export function getCurrentMonth() {
    const month = currentMonth + 1

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${currentYear}${formattedMonth}`;
}

// --------------------------------

export function getAllOperations() {
    const operations = useSelector((state: any) => state.operationReducer || []);
    return operations;

}

export function getOperationsByType(type: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    if (type) {
        return operations.filter((operation: any) => operation.type === type)
            .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
        return operations.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
}

export function getOperationById(id: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    if (id) {
        return operations.find((operation: any) => operation._id === id);
    } else {
        return null;
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

    // Sorting by date
    operationsInMonth.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

    operationsInYear.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return operationsInYear;
}

export function getLastFiveOperationsByType(type: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    const filteredOperations = operations.filter((operation: any) => operation.type === type);


    const filteredOperationsThisMonth = filteredOperations.filter((operation: any) => {
        const operationMonth = new Date(operation.date).getMonth();
        return operationMonth === currentMonth;
    });

    filteredOperationsThisMonth.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const lastFiveOperations = filteredOperationsThisMonth.slice(0, 5);

    return lastFiveOperations;
}
