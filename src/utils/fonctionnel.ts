export const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
export const getCurrentDate = `${currentYear}-${month}-${day}`;

// ---------------------------------

export function Path(lePath: any, level: any) {
    if (lePath && lePath.pathname) {
        const path = lePath.pathname;
        const pathParts = path.split('/');
        return pathParts[level];
    } else {
        return null;
    }
}

export function addSpace(number: number | string): string {

    const numStr: string = typeof number === 'number' ? number.toString() : number;

    const [integerPart, decimalPart] = numStr.split('.');

    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
}

export function convertDate(code: any) {
    const annee = code.substring(0, 4);
    const moisNumero = parseInt(code.substring(4), 10);

    const nomMois = months[moisNumero - 1];

    return nomMois + " " + annee;
}

export function convertDateHour(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} à ${hours}h ${minutes}m ${seconds}s`;
}

export function formatDate(date: any) {

    const [year, month, day] = date.split("-");
    const monthIndex = parseInt(month, 10) - 1;

    return `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
}

export function convertirFormatDate(date: any) {
    const dateObj = new Date(date);
    const jourFormatte = String(dateObj.getDate()).padStart(2, '0');
    const moisFormatte = String(dateObj.getMonth() + 1).padStart(2, '0');
    return `${jourFormatte}/${moisFormatte}`;
};

export function separateMillier(valeur: any) {
    const montantNumerique = typeof valeur === 'number' ? valeur : parseFloat(valeur) || 0;
    const [partieEntiere, partieDecimale] = montantNumerique.toFixed(2).split('.');
    return `${partieEntiere}.${partieDecimale}`;
};

export function formatMontant(montant: any, type: string) {
    if (type === "Dépense") {
        return `-${separateMillier(montant)}`;
    } else {
        return separateMillier(montant);
    }
}
