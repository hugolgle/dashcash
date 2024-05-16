import { useSelector } from "react-redux";


export function calculTotal(type: any, idUser: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    const userOperations = operations.filter((operation: any) => operation.user === idUser);


    const filteredOperations = userOperations.filter((operation: any) => operation.type === type);

    const totalAmount = filteredOperations.reduce((total: any, operation: any) => total + parseFloat(operation.montant), 0.00);

    const formattedTotal = `${totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;

    return formattedTotal
}

export function calculTotalByMonth(type: any, month: string, idUser: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    const userOperations = operations.filter((operation: any) => operation.user === idUser);

    const year = month.slice(0, 4);
    const monthNumber = month.slice(4);

    const filteredOperations = userOperations.filter((operation: any) => {
        const operationYear = operation.date.slice(0, 4);
        const operationMonth = operation.date.slice(5, 7);
        return operation.type === type && operationYear === year && operationMonth === monthNumber;
    });

    const totalAmount = filteredOperations.reduce((total: any, operation: any) => total + parseFloat(operation.montant), 0.00);

    const formattedTotal = `${totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;

    return formattedTotal;
}

export function calculTotalByYear(type: any, year: any, idUser: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    const userOperations = operations.filter((operation: any) => operation.user === idUser);

    const filteredOperations = userOperations.filter((operation: any) => {
        const operationYear = operation.date.slice(0, 4);
        return operation.type === type && operationYear === year;
    });

    const totalAmount = filteredOperations.reduce((total: any, operation: any) => total + parseFloat(operation.montant), 0.00);

    const formattedTotal = `${totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;

    return formattedTotal;
}

export function calculMoyenne(type: any, year: any, nbMonth: any, idUser: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    const userOperations = operations.filter((operation: any) => operation.user === idUser);

    let filteredOperations = userOperations.filter((operation: any) => {
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

    if (isNaN(resultat)) {
        return '0.00 €';
    }

    return `${resultat.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} €`;
}


export function calculEconomie(year: any, month: any, idUser: any) {
    const operations = useSelector((state: any) => state.operationReducer || []);

    const userOperations = operations.filter((operation: any) => operation.user === idUser);

    let filteredOperations = userOperations.filter((operation: any) => {
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

    const economieMoyenne = (recettesMoyennesNumber + depensesMoyennesNumber);

    const economieMoyenneFormatted = economieMoyenne.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return economieMoyenneFormatted;
}

