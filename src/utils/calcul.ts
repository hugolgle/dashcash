import { useSelector } from "react-redux";


export function calculTotal(type: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    const filteredOperations = operations.filter((operation: any) => operation.type === type);

    const totalAmount = filteredOperations.reduce((total: any, operation: any) => total + parseFloat(operation.montant), 0.00);

    const formattedTotal = `${totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;

    return formattedTotal
}

export function calculTotalByMonth(type: any, month: string) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    const year = month.slice(0, 4);
    const monthNumber = month.slice(4);

    const filteredOperations = operations.filter((operation: any) => {
        // Extraire l'année et le mois de la date de l'opération
        const operationYear = operation.date.slice(0, 4);
        const operationMonth = operation.date.slice(5, 7);
        return operation.type === type && operationYear === year && operationMonth === monthNumber;
    });

    const totalAmount = filteredOperations.reduce((total: any, operation: any) => total + parseFloat(operation.montant), 0.00);

    const formattedTotal = `${totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;

    return formattedTotal;
}

export function calculTotalByYear(type: any, year: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    const filteredOperations = operations.filter((operation: any) => {
        const operationYear = operation.date.slice(0, 4);
        return operation.type === type && operationYear === year;
    });

    const totalAmount = filteredOperations.reduce((total: any, operation: any) => total + parseFloat(operation.montant), 0.00);

    const formattedTotal = `${totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;

    return formattedTotal;
}

export function calculMoyenne(type: any, year: any, nbMonth: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    // Filtrer les opérations pour l'année et le type spécifiés
    const filteredOperations = operations.filter((operation: any) => {
        const operationYear = operation.date.slice(0, 4);
        return operation.type === type && operationYear === year;
    });

    // Calculer la somme des montants des opérations filtrées
    const totalAmount = filteredOperations.reduce((acc: number, operation: any) => {
        return acc + parseFloat(operation.montant);
    }, 0);

    // Calculer la moyenne en divisant la somme totale par le nombre de mois
    const resultat = totalAmount / parseFloat(nbMonth);

    return `${resultat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
}
