import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createBrowserRouter, Outlet, RouterProvider, useLocation} from "react-router-dom";
import Catalogo from "./pages/catalogo/Catalogo";
import ProdutoForm from "./pages/produtos/ProdutoForm";
import Header from "./components/Header/Header";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ClienteList from "./pages/clientes/ClienteList";
import ClienteForm from "./pages/clientes/ClienteForm";
import Carrinho from "./pages/carrinho/Carrinho";
import CarrinhoProvider from "./contexts/CarrinhoContext";
import Checkout from "./pages/checkout/Checkout";
import UserProvider from "./contexts/UserContext";

const MainLayout = () => {
  const location = useLocation();

  const shouldShowHeader = location.pathname !== "/";

  return (
      <>
        {shouldShowHeader && <Header />}
        <Outlet />
      </>
  );
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/catalogo", element: <Catalogo /> },
      { path: "/produtos/:id", element: <ProdutoForm /> },
      { path: "/home", element: <Home /> },
      { path: "/clientes", element: <ClienteList /> },
      { path: "/cliente/:id", element: <ClienteForm /> },
      { path: "/carrinho", element: <Carrinho /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
]);

function App() {
  return (

          <CarrinhoProvider>
              <UserProvider>
            <div className="App">
              <RouterProvider router={router} />
            </div>
              </UserProvider>
          </CarrinhoProvider>

  );
}


export default App;
