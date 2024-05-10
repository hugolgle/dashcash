import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/home';
import Navbar from './components/Navbar/navbar';
import Recette from './pages/Recette/recette';
import Depense from './pages/Depense/depense';
import Epargn from './pages/Epargn/epargn';
import Invest from './pages/Invest/invest';
import Connexion from './pages/Connexion/connexion';
import Profil from './pages/Profil/profil';
import TableauDeBord from './pages/TableauDeBord/tableaudebord';
import PageAdd from './pages/PageAdd/pageAdd';
import PageTransactions from './pages/PageTransactions/pageTransactions';
import PageError from './pages/PageError/pageError';
import Transaction from './pages/Transaction/transaction';
import Statistique from './pages/Statistique/statistique';
import LayoutRD from './layout/layoutRD';


function App() {
  const router = createBrowserRouter([
    {
      element: <Navbar />,
      errorElement: <PageError />,
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
          path: '/recette',
          element: <LayoutRD title="Recettes" />,
        },
        {
          path: '/recette/:month/:id',
          element: <Transaction />,
        },
        {
          path: '/recette/add',
          element: <PageAdd page="recette" />,
        },
        {
          path: '/recette/:month',
          element: <PageTransactions title="Recettes" />,
        },
        {
          path: '/recette/:month/:id',
          element: <Transaction />,
        },
        {
          path: '/depense',
          element: <LayoutRD title="Dépenses" />,
        },
        {
          path: '/depense/add',
          element: <PageAdd page="dépense" />,
        },
        {
          path: '/depense/:month',
          element: <PageTransactions title="Dépenses" />,
        },
        {
          path: '/depense/:month/:id',
          element: <Transaction />,
        },
        {
          path: '/epargn',
          element: <Epargn />
        },
        {
          path: '/invest',
          element: <Invest />
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
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}


export default App