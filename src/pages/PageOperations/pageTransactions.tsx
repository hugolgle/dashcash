import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { convertDate } from '../../utils/fonctionnel';
import { calculTotalByMonth, calculTotal, calculTotalByYear } from '../../utils/calcul';
import { getTransactionsByYear, getTransactionsByMonth, getTransactionsByType } from '../../utils/operations';
import TableauTransac from '../../components/Tableau/tableauTransac';
import { infoUser } from '../../utils/users';
import BtnReturn from '../../components/button/btnReturn';
import BtnAdd from '../../components/button/btnAdd';
import { ChevronLeft, ChevronRight, ListCollapse } from 'lucide-react';
import BtnFilter from '../../components/button/btnFilter';
import { categorieSort } from '../../utils/autre';
import { categorieDepense } from '../../../public/categories.json'
import { categorieRecette } from '../../../public/categories.json'


export default function PageTransactions(props: any) {

    const userInfo = infoUser();
    const [transactionDeleted, setTransactionDeleted] = useState(false);
    const { date } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const typeProps = props.type === "Dépense" ? "depense" : props.type === "Recette" ? "recette" : undefined;
    const [selectOpe, setSelectOpe] = useState(false);

    const handleSelectOpe = () => {
        setSelectOpe(!selectOpe);
    };

    const categories = props.type === "Dépense"
        ? categorieSort(categorieDepense)
        : props.type === "Recette"
            ? categorieSort(categorieRecette)
            : "";

    const [showModal, setShowModal] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.getAll('categories'));

    useEffect(() => {
        const isTransactionDeleted = localStorage.getItem('transactionDeleted') === 'true';
        if (isTransactionDeleted) {
            setTransactionDeleted(true);
            localStorage.removeItem('transactionDeleted');
            const timeout = setTimeout(() => {
                setTransactionDeleted(false);
            }, 7000);
            return () => clearTimeout(timeout);
        }
    }, []);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleCheckboxChange = (event: any) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        const updatedCategories = isChecked
            ? [...selectedCategories, value]
            : selectedCategories.filter(cat => cat !== value);

        setSelectedCategories(updatedCategories);
        setSearchParams({ categories: updatedCategories });
    };

    const check = selectedCategories.length;
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const performSearch = (term: string) => {
        const filteredTransactions = transactions.filter((transaction: any) => {
            const titleMatches = transaction.titre.toLowerCase().includes(term.toLowerCase());
            const categoryMatches = transaction.categorie.toLowerCase().includes(term.toLowerCase());
            return titleMatches || categoryMatches;
        });
        setSearchResults(filteredTransactions);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        performSearch(event.target.value);
    };

    const transactions = date === "all"
        ? getTransactionsByType(props.type, userInfo.id, selectedCategories)
        : date?.length === 4
            ? getTransactionsByYear(date, props.type, userInfo.id, selectedCategories)
            : getTransactionsByMonth(date, props.type, userInfo.id, selectedCategories);

    useEffect(() => {
        if (searchTerm === "") {
            setSearchResults(transactions);
        }
    }, [searchTerm, transactions]);

    const clearFilters = () => {
        setSelectedCategories([]);
        setSearchParams({});
        setShowModal(false);
    };

    const clickLastMonth = () => {
        if (date) {
            let yearNum = parseInt(date.slice(0, 4), 10);
            if (date.length === 4) { yearNum -= 1 }

            let monthNum = parseInt(date.slice(4), 10);
            monthNum -= 1;
            if (monthNum === 0) {
                monthNum = 12;
                yearNum -= 1;
            }
            const newMonth = monthNum.toString().padStart(2, '0');
            const newDate = `${yearNum}${newMonth}`;
            if (date.length === 4) {
                navigate(`/${typeProps}/${yearNum}`);
            } else if (date.length === 6) {
                navigate(`/${typeProps}/${newDate}`);
            } else {
                return ""
            }
        }
    };

    const clickNextMonth = () => {
        if (date) {
            let yearNum = parseInt(date.slice(0, 4), 10);
            if (date.length === 4) { yearNum += 1 }
            let monthNum = parseInt(date.slice(4), 10);
            monthNum += 1;
            if (monthNum === 13) {
                monthNum = 1;
                yearNum += 1;
            }
            const newMonth = monthNum.toString().padStart(2, '0');
            const newDate = `${yearNum}${newMonth}`;
            if (date.length === 4) {
                navigate(`/${typeProps}/${yearNum}`);
            } else if (date.length === 6) {
                navigate(`/${typeProps}/${newDate}`);
            } else {
                return ""
            }
        }
    };



    return (
        <>
            <section className="w-full relative">
                <h2 className="  text-5xl font-thin mb-5">{date === "all" ? `Toutes les ${props.type.toLowerCase()}s` : date?.length === 4 ? `${props.type}s de ${date}` : `${props.type}s de ${convertDate(date)}`}</h2>
                <div className='absolute top-0 flex flex-row w-full gap-2'>
                    <BtnReturn />
                    <BtnAdd to={`/${typeProps}`} />
                    <ListCollapse className={`cursor-pointer hover:scale-110 transition-all ${selectOpe ? "text-zinc-500" : ""}`} onClick={handleSelectOpe} />
                    <BtnFilter categories={categories} action={toggleModal} check={check}>
                        {showModal && (
                            <div className="flex flex-col bg-zinc-400 dark:bg-zinc-600 rounded z-50 text-left p-2 mt-8 absolute">
                                <p className='text-center font-semibold'>Filtrer par :</p>
                                <div className='grid grid-cols-2 gap-x-2'>
                                    {Array.isArray(categories) && categories.map(({ name }: { name: string }) => (
                                        <div key={name}>
                                            <input
                                                type="checkbox"
                                                id={name}
                                                name="categorie"
                                                value={name}
                                                checked={selectedCategories.includes(name)}
                                                onChange={handleCheckboxChange}
                                                className='cursor-pointer'
                                            />
                                            <label htmlFor={name} className='cursor-pointer'> {name}</label>
                                        </div>
                                    ))}
                                </div>

                                <button className='text-xs hover:bg-red-800 transition-all' onClick={clearFilters}>Annuler</button>
                            </div>
                        )}
                    </BtnFilter>
                    <input
                        className='rounded-xl px-2 w-32 bg-zinc-100 dark:bg-zinc-900 placeholder:text-sm'
                        type="search"
                        name=""

                        placeholder='Rechercher'
                        value={searchTerm}
                        onChange={handleSearchChange} />
                </div>
                <div className={`flex flex-row gap-4 absolute top-0 right-0 ${date === "all" ? "invisible" : ""}`}>
                    <ChevronLeft className='cursor-pointer hover:scale-90 transition-all' onClick={clickLastMonth} />
                    <ChevronRight className='cursor-pointer hover:scale-90 transition-all' onClick={clickNextMonth} />
                </div>

                <TableauTransac transactions={searchTerm ? searchResults : transactions} selectOpe={selectOpe} />


                <div className="fixed w-44 bottom-10 right-0 rounded-l-xl shadow-2xl shadow-black bg-zinc-200 hover:opacity-0  dark:bg-zinc-800 py-3 transition-all">
                    Total : <b>{
                        date === "all" ? calculTotal(props.type, userInfo.id, selectedCategories) :
                            date && date.length === 4 ? calculTotalByYear(props.type, date, userInfo.id, selectedCategories) :
                                date ? calculTotalByMonth(props.type, date, userInfo.id, selectedCategories) : "Date non définie"
                    }</b>
                    <br />
                    Transaction(s) : <b>{
                        date === "all" ? getTransactionsByType(props.type, userInfo.id, selectedCategories).length :
                            date?.length === 4 ? getTransactionsByYear(date, props.type, userInfo.id, selectedCategories).length :
                                getTransactionsByMonth(date, props.type, userInfo.id, selectedCategories).length
                    }</b>
                </div>
                {
                    transactionDeleted ? (
                        <div className={`fixed bottom-4 right-4 flex justify-center transition-all items-center animate-[fadeIn_7s_ease-in-out_forwards]`}>
                            <p className="p-4 bg-red-900 max-w-60 rounded shadow-2xl shadow-black">
                                Votre transaction a été supprimée avec succès
                            </p>
                        </div>
                    ) : null
                }
            </section>
        </>
    );
}
