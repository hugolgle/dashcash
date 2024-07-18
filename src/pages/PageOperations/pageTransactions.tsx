import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertDate } from '../../utils/fonctionnel';
import { calculTotalByMonth, calculTotal, calculTotalByYear } from '../../utils/calcul';
import { getTransactionsByYear, getTransactionsByMonth, getTransactionsByType } from '../../utils/operations';
import TableauTransac from '../../components/Tableau/tableauTransac';
import { infoUser } from '../../utils/users';
import BtnReturn from '../../components/button/btnReturn';
import BtnAdd from '../../components/button/btnAdd';
import { ListCollapse } from 'lucide-react';
import BtnFilter from '../../components/button/btnFilter';
import { categorieSort } from '../../utils/autre';
import { categorieDepense } from '../../../public/categories.json'
import { categorieRecette } from '../../../public/categories.json'
import BtnSearch from '../../components/button/btnSearch';


export default function PageTransactions(props: any) {

    const userInfo = infoUser();

    const [transactionDeleted, setTransactionDeleted] = useState(false);

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

    const { date } = useParams();

    const typeProps = props.type === "Dépense" ? "depense" : props.type === "Recette" ? "recette" : undefined;

    const [selectOpe, setSelectOpe] = useState(false)

    const handleSelectOpe = () => {
        setSelectOpe(!selectOpe);
    };

    const categories = props.type === "Dépense"
        ? categorieSort(categorieDepense)
        : props.type === "Recette"
            ? categorieSort(categorieRecette)
            : "";
    const [showModal, setShowModal] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    ;


    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleCheckboxChange = (event: any) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (event.target.name === 'categorie') {
            if (isChecked) {
                setSelectedCategories([...selectedCategories, value]);
            } else {
                setSelectedCategories(selectedCategories.filter(cat => cat !== value));
            }
        }
    }

    const check = selectedCategories.length;

    const [showSearch, setShowSearch] = useState(false);

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

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

    const transactions = date === "all" ? getTransactionsByType(props.type, userInfo.id, selectedCategories) :
        date?.length === 4 ? getTransactionsByYear(date, props.type, userInfo.id, selectedCategories) :
            getTransactionsByMonth(date, props.type, userInfo.id, selectedCategories);


    useEffect(() => {
        if (searchTerm === "") {
            setSearchResults(transactions);
        }
    }, [searchTerm, transactions]);

    const clearFilters = () => {
        setSelectedCategories([]);
        setShowModal(false);
    };


    return (
        <>
            <div className="w-full relative">
                <h2 className="text-5xl font-thin mb-9">{props.type}s de {date === "all" ? "tout temps" : date?.length === 4 ? date : convertDate(date)}</h2>
                <div className='absolute top-0 flex flex-row w-full gap-2'>
                    <BtnReturn />
                    <BtnAdd to={`/${typeProps}`} />
                    <ListCollapse className={`cursor-pointer hover:scale-110 transition-all ${selectOpe ? "text-zinc-500" : ""}`} onClick={handleSelectOpe} />
                    <BtnFilter categories={categories} action={toggleModal} check={check}>
                        {showModal && (
                            <div className="flex flex-col bg-zinc-500 rounded z-50 text-left p-2 mt-8 absolute">
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
                    <BtnSearch action={toggleSearch} ifSearch={showSearch}>
                        {showSearch ? <input
                            className='rounded px-2 ml-2 placeholder:text-sm'
                            type="search"
                            name=""
                            id=""
                            placeholder='Rechercher'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        /> : ""}
                    </BtnSearch>
                </div>
            </div>

            <TableauTransac transactions={searchTerm ? searchResults : transactions} selectOpe={selectOpe} />

            <div className="fixed w-44 bottom-10 right-0 rounded-l-xl shadow-2xl shadow-black bg-zinc-800 py-3 transition-all">
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
                    <div className={`absolute bottom-4 right-4 flex justify-center transition-all items-center animate-[fadeIn_7s_ease-in-out_forwards]`}>
                        <p className="p-4 bg-red-900 max-w-60 rounded shadow-2xl shadow-black">
                            Votre transaction a été supprimée avec succès
                        </p>
                    </div>
                ) : null
            }
        </>
    );
}
