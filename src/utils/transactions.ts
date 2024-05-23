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
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    const userOperations = transactions.filter((transaction: any) => transaction.user === idUser);

    return userOperations;
}

export function getTransactionsByType(type: any, idUser: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userOperations = transactions.filter((transaction: any) => transaction.user === idUser);
    if (type) {
        return userOperations.filter((transaction: any) => transaction.type === type)
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

export function getTransactionById(id: any, idUser: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userOperations = transactions.filter((transaction: any) => transaction.user === idUser);
    if (id) {
        return userOperations.find((transaction: any) => transaction._id === id);
    } else {
        return null;
    }
}

export function getTransactionsByMonth(month: any, type: any, idUser: any) {
    const targetMonth = `${month.slice(0, 4)}-${month.slice(4)}`;

    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userOperations = transactions.filter((transaction: any) => transaction.user === idUser);
    let transactionsInMonth = userOperations.filter((transaction: any) => {
        const transactionDate = transaction.date.split('T')[0];
        const transactionMonth = transactionDate.slice(0, 7);

        return transactionMonth === targetMonth;
    });

    if (type) {
        transactionsInMonth = transactionsInMonth.filter((transaction: any) => transaction.type === type);
    }

    transactionsInMonth.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    transactionsInMonth.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return transactionsInMonth;
}


export function getTransactionsByYear(year: any, type: any, idUser: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userOperations = transactions.filter((transaction: any) => transaction.user === idUser);
    let transactionsInYear = userOperations.filter((transaction: any) => {
        const transactionYear = transaction.date.slice(0, 4);

        return transactionYear === year;
    });

    if (type) {
        transactionsInYear = transactionsInYear.filter((transaction: any) => transaction.type === type);
    }

    transactionsInYear.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    transactionsInYear.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return transactionsInYear;
}

export function getLastFiveOperationsByType(type: any, idUser: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userOperations = transactions.filter((transaction: any) => transaction.user === idUser);
    const filteredOperations = userOperations.filter((transaction: any) => transaction.type === type);

    const filteredOperationsThisMonth = filteredOperations.filter((transaction: any) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });

    filteredOperationsThisMonth.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    filteredOperationsThisMonth.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const lastFiveOperations = filteredOperationsThisMonth.slice(0, 5);

    return lastFiveOperations;
}

