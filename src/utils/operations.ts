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

// -------------------------------- Transactions

export function getAllTransactions(idUser: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    return transactions.filter((transaction: any) => transaction.user === idUser);

}

export function getTransactionsByType(type: any, idUser: any, filterCategorie: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userTransactions = transactions.filter((transaction: any) => transaction.user === idUser);

    let filteredTransactions = type
        ? userTransactions.filter((transaction: any) => transaction.type === type)
        : userTransactions;

    if (filterCategorie && filterCategorie.length > 0) {
        filteredTransactions = filteredTransactions.filter((transaction: any) => filterCategorie.includes(transaction.categorie));
    }

    return filteredTransactions.sort((a: any, b: any) => {
        const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateSort !== 0) return dateSort;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}


export function getTransactionById(id: any, idUser: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userTransactions = transactions.filter((transaction: any) => transaction.user === idUser);
    if (id) {
        return userTransactions.find((transaction: any) => transaction._id === id);
    } else {
        return null;
    }
}

export function getTransactionsByMonth(month: any, type: any, idUser: any, filterCategorie: any) {
    const targetMonth = `${month.slice(0, 4)}-${month.slice(4)}`;

    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userTransactions = transactions.filter((transaction: any) => transaction.user === idUser);

    let transactionsInMonth = userTransactions.filter((transaction: any) => {
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

    transactionsInMonth.sort((a: any, b: any) => {
        const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateSort !== 0) return dateSort;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return transactionsInMonth;
}


export function getTransactionsByYear(year: any, type: any, idUser: any, filterCategorie: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userTransactions = transactions.filter((transaction: any) => transaction.user === idUser);

    let transactionsInYear = userTransactions.filter((transaction: any) => {
        const transactionYear = transaction.date.slice(0, 4);
        return transactionYear === year;
    });

    if (type) {
        transactionsInYear = transactionsInYear.filter((transaction: any) => transaction.type === type);
    }

    if (filterCategorie && filterCategorie.length > 0) {
        transactionsInYear = transactionsInYear.filter((transaction: any) => filterCategorie.includes(transaction.categorie));
    }

    transactionsInYear.sort((a: any, b: any) => {
        const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateSort !== 0) return dateSort;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return transactionsInYear;
}

export function getLastFiveTransactionsByType(type: any, idUser: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userTransactions = transactions.filter((transaction: any) => transaction.user === idUser);

    let filteredTransactions = userTransactions;
    if (type !== null) {
        filteredTransactions = userTransactions.filter((transaction: any) => transaction.type === type);
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

    const lastFiveTransactions = filteredTransactionsThisMonth.slice(0, 5);

    return lastFiveTransactions;
}


// -------------------------------- Investissements

export function getAllInvestments(idUser: any, isSold: boolean | null) {
    const investments = useSelector((state: any) => state.investmentReducer || []);

    const userInvestments = investments.filter((investment: any) => investment.user === idUser);

    const filteredInvestments = isSold !== null
        ? userInvestments.filter((investment: any) => investment.isSold === isSold)
        : userInvestments;

    return filteredInvestments.sort((a: any, b: any) => {
        const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateSort !== 0) return dateSort;

        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}


export function getInvestmentById(id: any, idUser: any) {
    const investments = useSelector((state: any) => state.investmentReducer || []);
    const userInvestments = investments.filter((investment: any) => investment.user === idUser);
    if (id) {
        return userInvestments.find((investment: any) => investment._id === id);
    } else {
        return null;
    }
}

// -------------------------------- Remboursements

export function getRefundsByTransactionId(transactionId: any, userId: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userTransactions = transactions.filter((transaction: any) => transaction.user === userId);

    const transaction = userTransactions.find((transaction: any) => transaction._id === transactionId);

    if (transaction) {
        return transaction.remboursements || [];
    } else {
        return [];
    }
}

export function getRefundByTransactionId(transactionId: any, refundId: any, userId: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);
    const userTransactions = transactions.filter((transaction: any) => transaction.user === userId);

    const transaction = userTransactions.find((transaction: any) => transaction._id === transactionId);

    if (transaction && transaction.remboursements) {
        return transaction.remboursements.find((refund: any) => refund._id === refundId) || null;
    } else {
        return null;
    }
}

// -------------------------------- Abonnement

export function getSubscriptions(idUser: any) {
    const abonnements = useSelector((state: any) => state.subscriptionReducer || []);

    return abonnements.filter((abonnement: any) => abonnement.user === idUser);
}

export function getSubscriptionById(subscriptionId: any, userId: any) {
    const abonnements = useSelector((state: any) => state.subscriptionReducer || []);
    const userAbonnements = abonnements.filter((subscription: any) => subscription.user === userId);

    return userAbonnements.find((subscription: any) => subscription._id === subscriptionId);
}
