import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/home';
import Navbar from './components/Navbar/navbar';
import Recette from './pages/Recette/recette';
import Depense from './pages/Depense/depense';


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
          element: <Recette />
        },
        {
          path: '/depense',
          element: <Depense />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}


export default App