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
import Transaction from './pages/Transaction/transaction';
import PageError from './pages/PageError/pageError';


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
          path: '/recette',
          element: <Recette />,
        }, {
          path: '/recette/add',
          element: <PageAdd page="recette" />,
        },
        {
          path: '/recette/janvier',
          element: <Transaction />,
        },
        {
          path: '/recette/fevrier',
          element: <Transaction />,
        },
        {
          path: '/recette/mars',
          element: <Transaction />,
        },
        {
          path: '/depense',
          element: <Depense />,
        },
        {
          path: '/depense/add',
          element: <PageAdd page="dépense" />,
        },
        {
          path: '/depense/janvier',
          element: <Transaction />,
        },
        {
          path: '/depense/fevrier',
          element: <Transaction />,
        },
        {
          path: '/depense/mars',
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
          path: '/connexion',
          element: <Connexion />
        },
        {
          path: '/profil',
          element: <Profil />
        },
        {
          path: '/tableaudebord',
          element: <TableauDeBord />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}


export default App