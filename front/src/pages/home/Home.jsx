import Button from '@mui/material/Button';
import {Link, NavLink, useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const navigateToProdutoList = () => {
        navigate("/produtos")
    }

    const navigateToNovoProduto = () => {
        navigate("/produtos/novo")
    }

    const navigateToClientList = () => {
        navigate("/clientes")
    }

    const navigateToNovoCliente = () => {
        navigate("/cliente/novo")
    }

    return <div className={"div-panel"}>
        <div>
            <Button variant="contained" onClick={navigateToProdutoList}>Produtos</Button>
            {/*<Link style={{ textDecoration: 'none' }} to="/produtos">  <Button variant="contained" >Produtos</Button></Link>*/}
            {/*<Link to="/produtos/novo">  <Button variant="contained" >Novo Produtos</Button></Link>*/}
            <Button variant="contained" onClick={navigateToNovoProduto}>Novo Produto</Button>
        </div>
        <div>
            <Button variant="contained" onClick={navigateToClientList}>Clientes</Button>
            <Button variant="contained" onClick={navigateToNovoCliente}>NovoCliente</Button>
        </div>
    </div>
}

export default Home;