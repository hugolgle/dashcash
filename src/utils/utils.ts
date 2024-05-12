import { useSelector } from "react-redux";

export const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

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

export function separateMillier(valeur: any) {
    const montantNumerique = typeof valeur === 'number' ? valeur : parseFloat(valeur) || 0;
    const [partieEntiere, partieDecimale] = montantNumerique.toFixed(2).split('.');
    const partieEntiereFormatee = parseInt(partieEntiere, 10).toLocaleString('fr-FR');
    return `${partieEntiereFormatee}.${partieDecimale} €`;
};

export function convertirFormatDate(date: any) {
    const dateObj = new Date(date);
    const jourFormatte = String(dateObj.getDate()).padStart(2, '0');
    const moisFormatte = String(dateObj.getMonth() + 1).padStart(2, '0');
    return `${jourFormatte}/${moisFormatte}`;
};

// ------------------------------  Récuperation des opérations 
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

// ------------------------------  Calcul des opérations 

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

// ------------------------------  Autres

export function getCurrentMonth() {
    const month = currentMonth + 1

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${currentYear}${formattedMonth}`;
}

export function getLastThreeMonthsOfCurrentYear() {

    const lastThreeMonths = [];
    for (let i = 2; i >= 1; i--) {
        const month = currentMonth - i;
        const year = month < 0 ? currentYear - 1 : currentYear;
        const formattedMonth = ("0" + (month < 0 ? 12 + month + 1 : month + 1)).slice(-2);
        const monthInLetter = months[month < 0 ? 12 + month : month];
        lastThreeMonths.push({ code: `${year}${formattedMonth}`, month: monthInLetter });
    }

    return lastThreeMonths;
}

export function getLastTwoYears() {

    const lastTwoYears = [];
    for (let i = 1; i >= 0; i--) {
        const year = currentYear - i;

        lastTwoYears.push(year);
    }

    return lastTwoYears;
}


export function premierJourMoisEnCours(): string {
    const dateActuelle: Date = new Date();
    const premierJourMois: Date = new Date(dateActuelle.getFullYear(), dateActuelle.getMonth(), 1);
    const jour: string = premierJourMois.getDate().toString().padStart(2, '0');
    const mois: string = (premierJourMois.getMonth() + 1).toString().padStart(2, '0');
    const annee: number = premierJourMois.getFullYear();
    const dateFormatee: string = `${jour}/${mois}/${annee}`;
    return dateFormatee;
}
