import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/home';
import Navbar from './components/Navbar/navbar';
import Epargn from './pages/Epargn/epargn';
import Connexion from './pages/Connexion/connexion';
import Profil from './pages/Profil/profil';
import TableauDeBord from './pages/TableauDeBord/tableaudebord';
import PageAddTransac from './pages/PageAdd/pageAddTransac';
import PageTransactions from './pages/PageOperations/pageTransactions';
import Transaction from './pages/Operation/transaction';
import Statistique from './pages/Statistique/statistique';
import LayoutTransac from './layout/layoutTransac';
import Inscription from './pages/Inscription/inscription';
import LayoutInvest from './layout/layoutInvest';
import PageAddInvest from './pages/PageAdd/pageAddInvest';
import PageInvestment from './pages/PageOperations/pageInvestment';
import Investment from './pages/Operation/investment';


function App() {

  const router = createBrowserRouter([
    {
      element: <Navbar />,
      errorElement: <Navbar><h1>Page introuvable !</h1></Navbar>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/tdb',
          element: <TableauDeBord />
        },
        {
          path: '/depense',
          element: <LayoutTransac type="Dépense" />,
        },
        {
          path: '/depense/add',
          element: <PageAddTransac type="Dépense" />,
        },
        {
          path: '/depense/:date',
          element: <PageTransactions type="Dépense" />,
        },
        {
          path: '/depense/:date/:id',
          element: <Transaction />,
        },
        {
          path: '/recette',
          element: <LayoutTransac type="Recette" />,
        },
        {
          path: '/recette/add',
          element: <PageAddTransac type="Recette" />,
        },
        {
          path: '/recette/:date',
          element: <PageTransactions type="Recette" />,
        },
        {
          path: '/recette/:date/:id',
          element: <Transaction />,
        },
        {
          path: '/epargn',
          element: <Epargn />
        },
        {
          path: '/invest',
          element: <LayoutInvest />
        },
        {
          path: '/invest/add',
          element: <PageAddInvest />
        },
        {
          path: '/invest/operations',
          element: <PageInvestment />
        },
        {
          path: '/invest/operations/:id',
          element: <Investment />
        },
        {
          path: '/stat',
          element: <Statistique />
        },
        {
          path: '/profil',
          element: <Profil />
        },
        {
          path: '/connexion',
          element: <Connexion />
        },
        {
          path: '/inscription',
          element: <Inscription />
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}


export default App