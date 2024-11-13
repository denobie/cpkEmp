import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createBrowserRouter, Outlet, RouterProvider, useLocation} from "react-router-dom";
import ProdutoList from "./pages/produtos/ProdutoList";
import ProdutoForm from "./pages/produtos/ProdutoForm";
import Header from "./components/Header/Header";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ClienteList from "./pages/clientes/ClienteList";
import ClienteForm from "./pages/clientes/ClienteForm";
import Carrinho from "./pages/carrinho/Carrinho";
import CarrinhoProvider from "./contexts/CarrinhoContext";

const MainLayout = () => {
  const location = useLocation();

  // Exibe o Header apenas se não estiver na rota de login
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
    element: <MainLayout />, // Define o MainLayout como o layout principal
    children: [
      { path: "/", element: <Login /> },
      { path: "/produtos", element: <ProdutoList /> },
      { path: "/produtos/:id", element: <ProdutoForm /> },
      { path: "/home", element: <Home /> },
      { path: "/clientes", element: <ClienteList /> },
      { path: "/cliente/:id", element: <ClienteForm /> },
      { path: "/carrinho", element: <Carrinho /> },
    ],
  },
]);

function App() {
  return (
      <CarrinhoProvider>
        <div className="App">
          <RouterProvider router={router} />
        </div>
      </CarrinhoProvider>
  );
}


export default App;
