import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import './Home.css'

function Home() {
    return <div>
        <div className="div-botoes">
            <Link style={{textDecoration: 'none'}} to="/catalogo">
                <Button variant="contained">Catálogo</Button>
            </Link>
        </div>
        <div className="div-botoes">
            <Link style={{textDecoration: 'none'}} to="/produtos">
                <Button variant="contained">Produtos</Button>
            </Link>
            <Link style={{textDecoration: 'none'}} to="/produto/novo">
                <Button variant="contained">Novo Produto</Button>
            </Link>
        </div>
        <div className="div-botoes">
            <Link style={{textDecoration: 'none'}} to="/clientes">
                <Button variant="contained">Clientes</Button>
            </Link>
            <Link style={{textDecoration: 'none'}} to="/cliente/novo">
                <Button variant="contained">Novo Cliente</Button>
            </Link>
        </div>
    </div>
}

export default Home;
