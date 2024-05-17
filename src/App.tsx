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
import Transaction from './pages/Transaction/transaction';
import Statistique from './pages/Statistique/statistique';
import Layout from './layout/layout';
import Inscription from './pages/Inscription/inscription';


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
          element: <Layout type="Dépense" />,
        },
        {
          path: '/depense/add',
          element: <PageAdd type="Dépense" />,
        },
        {
          path: '/depense/:date',
          element: <PageOperations type="Dépense" />,
        },
        {
          path: '/depense/:date/:id',
          element: <Transaction />,
        },
        {
          path: '/recette',
          element: <Layout type="Recette" />,
        },
        {
          path: '/recette/add',
          element: <PageAdd type="Recette" />,
        },
        {
          path: '/recette/:date',
          element: <PageOperations type="Recette" />,
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