import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/home';
import Navbar from './components/Navbar/navbar';
import Epargn from './pages/Epargn/epargn';
import Invest from './pages/Invest/invest';
import Connexion from './pages/Connexion/connexion';
import Profil from './pages/Profil/profil';
import TableauDeBord from './pages/TableauDeBord/tableaudebord';
import PageAdd from './pages/PageAdd/pageAdd';
import PageOperations from './pages/PageOperations/pageOperations';
import PageError from './pages/PageError/pageError';
import Transaction from './pages/Transaction/transaction';
import Statistique from './pages/Statistique/statistique';
import Layout from './layout/layout';


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
          path: '/depense',
          element: <Layout type="Dépenses" />,
        },
        {
          path: '/depense/add',
          element: <PageAdd type="dépense" />,
        },
        {
          path: '/depense/all',
          element: <PageOperations type="Dépenses" />,
        },
        {
          path: '/depense/:date',
          element: <PageOperations type="Dépenses" />,
        },
        {
          path: '/depense/:date/:id',
          element: <Transaction />,
        },
        {
          path: '/recette',
          element: <Layout type="Recettes" />,
        },
        {
          path: '/recette/add',
          element: <PageAdd type="recettes" />,
        },
        {
          path: '/recette/all',
          element: <PageOperations type="Recettes" />,
        },
        {
          path: '/recette/:date',
          element: <PageOperations type="Recettes" />,
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