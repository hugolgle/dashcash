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

    let filteredOperations = operations.filter((operation: any) => {
        const operationYear = operation.date.slice(0, 4);
        return operationYear === year;
    });

    if (type) {
        filteredOperations = filteredOperations.filter((operation: any) => {
            return operation.type === type;
        });
    }

    const totalAmount = filteredOperations.reduce((acc: number, operation: any) => {
        return acc + parseFloat(operation.montant);
    }, 0);

    const resultat = totalAmount / parseFloat(nbMonth);

    return `${resultat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
}

export function calculEconomie(year: any, month: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    let filteredOperations = operations.filter((operation: any) => {
        const operationYear = operation.date.slice(0, 4);
        return operationYear === year;
    });

    if (month) {
        filteredOperations = filteredOperations.filter((operation: any) => {
            const operationMonth = operation.date.slice(5, 7);
            return operationMonth === month;
        });
    }

    let totalRecettes = 0;
    let totalDepenses = 0;

    filteredOperations.forEach((operation: any) => {
        if (operation.type === 'Recette') {
            totalRecettes += parseFloat(operation.montant);
        } else if (operation.type === 'Dépense') {
            totalDepenses += parseFloat(operation.montant);
        }
    });

    const resultat = totalRecettes + totalDepenses;

    return resultat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
export function calculMoyenneEconomie(depensesMoyennes: any, recettesMoyennes: any) {
    const depensesMoyennesNumber = parseFloat(depensesMoyennes.replace(/\s/g, '').replace('€', ''));
    const recettesMoyennesNumber = parseFloat(recettesMoyennes.replace(/\s/g, '').replace('€', ''));

    const economieMoyenne = recettesMoyennesNumber + depensesMoyennesNumber;

    const economieMoyenneFormatted = economieMoyenne.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return economieMoyenneFormatted;
}

