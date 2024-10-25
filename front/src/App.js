import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProdutoList from "./pages/produtos/ProdutoList";
import ProdutoForm from "./pages/produtos/ProdutoForm";
import Header from "./components/Header";
import Home from "./pages/home/Home";


const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/produtos",
    Component: ProdutoList,
  },
  {
    path: "/produtos/novo",
    Component: ProdutoForm,
  },
]);


function App() {
  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
