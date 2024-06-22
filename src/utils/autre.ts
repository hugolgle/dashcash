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

// -----------------------------

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

export function categorieSort(categories: any) {
    if (!Array.isArray(categories)) {
        throw new Error("Input must be an array");
    }
    return categories.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    });
}
