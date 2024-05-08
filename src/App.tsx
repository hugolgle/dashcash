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


function App() {
  const router = createBrowserRouter([
    {
      element: <Navbar />,
      errorElement: <h1>ERROR 404</h1>,
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
          path: '/depense',
          element: <Depense />,
        },
        {
          path: '/depense/add',
          element: <PageAdd page="dépense" />,
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