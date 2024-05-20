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

export function getAllOperations(idUser: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    const userOperations = operations.filter((operation: any) => operation.user === idUser);

    return userOperations;
}

export function getOperationsByType(type: any, idUser: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);
    const userOperations = operations.filter((operation: any) => operation.user === idUser);
    if (type) {
        return userOperations.filter((operation: any) => operation.type === type)
            .sort((a: any, b: any) => {
                const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
                if (dateSort !== 0) return dateSort;

                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
    } else {
        return userOperations.sort((a: any, b: any) => {
            const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
            if (dateSort !== 0) return dateSort;

            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }
}

export function getOperationById(id: any, idUser: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);
    const userOperations = operations.filter((operation: any) => operation.user === idUser);
    if (id) {
        return userOperations.find((operation: any) => operation._id === id);
    } else {
        return null;
    }
}

export function getOperationsByMonth(month: any, type: any, idUser: any) {
    const targetMonth = `${month.slice(0, 4)}-${month.slice(4)}`;

    const operations = useSelector((state: any) => state.operationReducer || []);
    const userOperations = operations.filter((operation: any) => operation.user === idUser);
    let operationsInMonth = userOperations.filter((operation: any) => {
        const operationDate = operation.date.split('T')[0];
        const operationMonth = operationDate.slice(0, 7);

        return operationMonth === targetMonth;
    });

    if (type) {
        operationsInMonth = operationsInMonth.filter((operation: any) => operation.type === type);
    }

    operationsInMonth.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    operationsInMonth.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return operationsInMonth;
}


export function getOperationsByYear(year: any, type: any, idUser: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);
    const userOperations = operations.filter((operation: any) => operation.user === idUser);
    let operationsInYear = userOperations.filter((operation: any) => {
        const operationYear = operation.date.slice(0, 4);

        return operationYear === year;
    });

    if (type) {
        operationsInYear = operationsInYear.filter((operation: any) => operation.type === type);
    }

    operationsInYear.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    operationsInYear.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return operationsInYear;
}

export function getLastFiveOperationsByType(type: any, idUser: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);
    const userOperations = operations.filter((operation: any) => operation.user === idUser);
    const filteredOperations = userOperations.filter((operation: any) => operation.type === type);

    const filteredOperationsThisMonth = filteredOperations.filter((operation: any) => {
        const operationDate = new Date(operation.date);
        return operationDate.getMonth() === currentMonth && operationDate.getFullYear() === currentYear;
    });

    filteredOperationsThisMonth.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    filteredOperationsThisMonth.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const lastFiveOperations = filteredOperationsThisMonth.slice(0, 5);

    return lastFiveOperations;
}

