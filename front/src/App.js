import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createBrowserRouter, Outlet, RouterProvider, useLocation} from "react-router-dom";
import Catalogo from "./pages/catalogo/Catalogo";
import ProdutoForm from "./pages/produto/ProdutoForm";
import Header from "./components/Header/Header";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ClienteList from "./pages/cliente/ClienteList";
import ClienteForm from "./pages/cliente/ClienteForm";
import Carrinho from "./pages/carrinho/Carrinho";
import CarrinhoProvider from "./contexts/CarrinhoContext";
import Checkout from "./pages/checkout/Checkout";
import UserProvider from "./contexts/UserContext";
import ProdutoList from "./pages/produto/ProdutoList";
import {useState} from "react";

const MainLayout = () => {
    const location = useLocation();
    const [consultaProduto, setConsultaProduto] = useState("");

    const noHeaderPaths = [
        "/",
        "/clientes",
        "/cliente/novo",
        "/cliente/novoLogin",
        "/produtos",
        "/produto/novo"
    ];

    const shouldShowHeader = !noHeaderPaths.includes(location.pathname);

    return (
        <>
            {shouldShowHeader && <Header onSearch={setConsultaProduto} />}
            <Outlet context={{ consultaProduto }} />
        </>
    );
};

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
        { path: "/", element: <Login /> },
        { path: "/catalogo", element: <Catalogo /> },
        { path: "/produtos", element: <ProdutoList /> },
        { path: "/produto/:id", element: <ProdutoForm /> },
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
