import { useSelector } from "react-redux";
import { subMonths, startOfMonth } from "date-fns";


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

// -------------------------------- Transactions

export function getAllTransactions() {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    return transactions
}

export function getTransactionsByType(type: any, filterCategorie: any, filterTitle: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    let filteredTransactions = type
        ? transactions.filter((transaction: any) => transaction.type === type)
        : transactions;

    if (filterCategorie && filterCategorie.length > 0) {
        filteredTransactions = filteredTransactions.filter((transaction: any) => filterCategorie.includes(transaction.categorie));
    }

    if (filterTitle && filterTitle.length > 0) {
        filteredTransactions = filteredTransactions.filter((transaction: any) => filterTitle.includes(transaction.titre));
    }

    return filteredTransactions.sort((a: any, b: any) => {
        const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateSort !== 0) return dateSort;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}



export function getTransactionById(id: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    if (id) {
        return transactions.find((transaction: any) => transaction._id === id);
    } else {
        return null;
    }
}

export function getTransactionsByMonth(month: any, type: any, filterCategorie: any, filterTitle: any) {
    const targetMonth = `${month.slice(0, 4)}-${month.slice(4)}`;

    const transactions = useSelector((state: any) => state.transactionReducer || []);

    let transactionsInMonth = transactions.filter((transaction: any) => {
        const transactionDate = transaction.date.split('T')[0];
        const transactionMonth = transactionDate.slice(0, 7);

        return transactionMonth === targetMonth;
    });

    if (type) {
        transactionsInMonth = transactionsInMonth.filter((transaction: any) => transaction.type === type);
    }

    if (filterCategorie && filterCategorie.length > 0) {
        transactionsInMonth = transactionsInMonth.filter((transaction: any) => filterCategorie.includes(transaction.categorie));
    }

    if (filterTitle && filterTitle.length > 0) {
        transactionsInMonth = transactionsInMonth.filter((transaction: any) => filterTitle.includes(transaction.titre));
    }

    transactionsInMonth.sort((a: any, b: any) => {
        const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateSort !== 0) return dateSort;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return transactionsInMonth;
}


export function getTransactionsByYear(year: any, type: any, filterCategorie: any, filterTitle: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    let transactionsInYear = transactions.filter((transaction: any) => {
        const transactionYear = transaction.date.slice(0, 4);
        return transactionYear === year;
    });

    if (type) {
        transactionsInYear = transactionsInYear.filter((transaction: any) => transaction.type === type);
    }

    if (filterCategorie && filterCategorie.length > 0) {
        transactionsInYear = transactionsInYear.filter((transaction: any) => filterCategorie.includes(transaction.categorie));
    }

    if (filterTitle && filterTitle.length > 0) {
        transactionsInYear = transactionsInYear.filter((transaction: any) => filterTitle.includes(transaction.titre));
    }

    transactionsInYear.sort((a: any, b: any) => {
        const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateSort !== 0) return dateSort;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return transactionsInYear;
}

export function getLastTransactionsByType(type: any, number: Number) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    let filteredTransactions = transactions;
    if (type !== null) {
        filteredTransactions = transactions.filter((transaction: any) => transaction.type === type);
    }

    const getCurrentMonthAndYear = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        return { month: currentMonth, year: currentYear };
    };

    const { month: currentMonth, year: currentYear } = getCurrentMonthAndYear();

    const filteredTransactionsThisMonth = filteredTransactions.filter((transaction: any) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });

    filteredTransactionsThisMonth.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    filteredTransactionsThisMonth.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const lastFiveTransactions = filteredTransactionsThisMonth.slice(0, number);

    return lastFiveTransactions;
}


// -------------------------------- Investissements

export function getAllInvestments(isSold: boolean | null) {
    const investments = useSelector((state: any) => state.investmentReducer || []);

    const filteredInvestments = isSold !== null
        ? investments.filter((investment: any) => investment.isSold === isSold)
        : investments;

    return filteredInvestments.sort((a: any, b: any) => {
        const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateSort !== 0) return dateSort;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}


export function getInvestmentById(id: any) {
    const investments = useSelector((state: any) => state.investmentReducer || []);
    if (id) {
        return investments.find((investment: any) => investment._id === id);
    } else {
        return null;
    }
}

// -------------------------------- Remboursements

export function getRefundsByTransactionId(transactionId: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    const transaction = transactions.find((transaction: any) => transaction._id === transactionId);

    if (transaction) {
        return transaction.remboursements || [];
    } else {
        return [];
    }
}

export function getRefundByTransactionId(transactionId: any, refundId: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    const transaction = transactions.find((transaction: any) => transaction._id === transactionId);

    if (transaction && transaction.remboursements) {
        return transaction.remboursements.find((refund: any) => refund._id === refundId) || null;
    } else {
        return null;
    }
}

// -------------------------------- Titres

export function getTitleOfTransactionsByType(type: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    // Calculer la date de début des deux derniers mois
    const currentDate = new Date();
    const startDate = startOfMonth(subMonths(currentDate, 2));

    // Filtrer les transactions par type et par date
    const filteredTransactions = transactions.filter((transaction: any) => {
        const transactionDate = new Date(transaction.date);
        return transaction.type === type && transactionDate >= startDate;
    });

    const titles = filteredTransactions.map((transaction: any) => transaction.titre);

    // Tri des titres par ordre alphabétique
    const sortedTitles = titles.sort((a: any, b: any) => {
        if (a.toLowerCase() < b.toLowerCase()) {
            return -1;
        }
        if (a.toLowerCase() > b.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    // Supprimer les doublons
    const uniqueTitles = Array.from(new Set(sortedTitles));

    return uniqueTitles;
}

// -------------------------------- Auto complete form


export function getLatestTransactionByTitle(title: string, type: string) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    let filteredTransactions = type
        ? transactions.filter((transaction: any) => transaction.type === type)
        : transactions;

    const filteredByTitle = filteredTransactions.filter((transaction: any) => transaction.titre === title);

    if (filteredByTitle.length === 0) return null;

    return filteredByTitle.sort((a: any, b: any) => {
        const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateSort !== 0) return dateSort;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })[0];
}

