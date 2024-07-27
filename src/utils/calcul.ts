import { useSelector } from "react-redux";

export function calculTotal(type: any, filterCategorie: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    const filteredOperationsByType = transactions.filter((transaction: any) => transaction.type === type);

    const filteredOperationsByCategory = filterCategorie && filterCategorie.length > 0
        ? filteredOperationsByType.filter((transaction: any) => filterCategorie.includes(transaction.categorie))
        : filteredOperationsByType;

    const totalAmount = filteredOperationsByCategory.reduce((total: any, transaction: any) => total + parseFloat(transaction.montant), 0.00);

    const formattedTotal = `${totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;

    return formattedTotal;
}

export function calculTotalByMonth(type: any, month: string, filterCategorie: any | null) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    const year = month.slice(0, 4);
    const monthNumber = month.slice(4);

    const filteredOperations = transactions.filter((transaction: any) => {
        const transactionYear = transaction.date.slice(0, 4);
        const transactionMonth = transaction.date.slice(5, 7);
        return transaction.type === type && transactionYear === year && transactionMonth === monthNumber;
    });

    const filteredOperationsByCategory = filterCategorie && filterCategorie.length > 0
        ? filteredOperations.filter((transaction: any) => filterCategorie.includes(transaction.categorie))
        : filteredOperations;

    const totalAmount = filteredOperationsByCategory.reduce((total: any, transaction: any) => total + parseFloat(transaction.montant), 0.00);

    const formattedTotal = `${totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;

    return formattedTotal;
}

export function calculTotalByYear(type: any, year: any, filterCategorie: any | null) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    const filteredOperations = transactions.filter((transaction: any) => {
        const transactionYear = transaction.date.slice(0, 4);
        return transaction.type === type && transactionYear === year;
    });

    const filteredOperationsByCategory = filterCategorie && filterCategorie.length > 0
        ? filteredOperations.filter((transaction: any) => filterCategorie.includes(transaction.categorie))
        : filteredOperations;

    const totalAmount = filteredOperationsByCategory.reduce((total: any, transaction: any) => total + parseFloat(transaction.montant), 0.00);

    const formattedTotal = `${totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;

    return formattedTotal;
}

export function calculMoyenne(type: any, year: any, nbMonth: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    let filteredOperations = transactions.filter((transaction: any) => {
        const transactionYear = transaction.date.slice(0, 4);
        return transactionYear === year;
    });

    if (type) {
        filteredOperations = filteredOperations.filter((transaction: any) => {
            return transaction.type === type;
        });
    }

    const totalAmount = filteredOperations.reduce((acc: number, transaction: any) => {
        return acc + parseFloat(transaction.montant);
    }, 0);

    const resultat = totalAmount / parseFloat(nbMonth);

    if (isNaN(resultat)) {
        return '0.00 €';
    }

    return `${resultat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
}


export function calculEconomie(year: any, month: any) {
    const transactions = useSelector((state: any) => state.transactionReducer || []);

    let filteredOperations = transactions.filter((transaction: any) => {
        const transactionYear = transaction.date.slice(0, 4);
        return transactionYear === year;
    });

    if (month) {
        filteredOperations = filteredOperations.filter((transaction: any) => {
            const transactionMonth = transaction.date.slice(5, 7);
            return transactionMonth === month;
        });
    }

    let totalRecettes = 0;
    let totalDepenses = 0;

    filteredOperations.forEach((transaction: any) => {
        if (transaction.type === 'Recette') {
            totalRecettes += parseFloat(transaction.montant);
        } else if (transaction.type === 'Dépense') {
            totalDepenses += parseFloat(transaction.montant);
        }
    });

    const resultat = totalRecettes + totalDepenses;

    return resultat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
export function calculMoyenneEconomie(depensesMoyennes: any, recettesMoyennes: any) {
    const depensesMoyennesNumber = parseFloat(depensesMoyennes.replace(/\s/g, '').replace('€', ''));
    const recettesMoyennesNumber = parseFloat(recettesMoyennes.replace(/\s/g, '').replace('€', ''));

    const economieMoyenne = (recettesMoyennesNumber + depensesMoyennesNumber);

    const economieMoyenneFormatted = economieMoyenne.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return economieMoyenneFormatted;
}

// Investment


export function calculTotalInvestment(isSold: boolean | null) {
    const investments = useSelector((state: any) => state.investmentReducer || []);

    const filteredOperations = isSold !== null
        ? investments.filter((investment: any) => investment.isSold === isSold)
        : investments;

    const totalAmount = filteredOperations.reduce((total: number, investment: any) => {
        if (isSold && investment.montantVendu !== undefined) {
            return total + parseFloat(investment.montantVendu);
        } else {
            return total + parseFloat(investment.montant);
        }
    }, 0.00);

    const formattedTotal = `${totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;

    return formattedTotal;
}
