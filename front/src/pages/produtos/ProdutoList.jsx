import axios from "axios";
import {useContext, useEffect, useState} from "react";
import './ProdutoList.css'
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {CartContext} from '../../contexts/CartContext';
import {useNavigate} from "react-router-dom";

function getProdutos() {
    return axios.get('http://localhost:8080/api/produto')
}

function Produto({produto}) {
    const { handleAddCart } = useContext(CartContext);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    }

    return (
        <div className="div-list">
            <div className="produtos">
                <div className="div-img-produto">
                    <img className="img-produto" src={produto.caminhoimagem} width="250" height="250"/>
                </div>
                <div>
                    <div>
                        <h2 className="h2-nome-produto">
                            <p>{produto.descricao}</p>
                        </h2>
                    </div>
                    <div className="div-preco">
                        <p>{formatCurrency(produto.preco)}</p>
                    </div>
                    <div>
                        <Button variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => handleAddCart(produto, 1)}>Adicionar ao Carrinho</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProdutoList() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        buscarProdutos()
    }, []);

    const buscarProdutos = () => {
        setLoading(true);
         getProdutos()
            .then(resultado => setProdutos(resultado.data.content))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return <div>
        {loading && <div>Carregando...</div>}

        {produtos.length > 0 ? (
            produtos.map((produto) => (
                <Produto
                    key={produto.id}
                    produto={produto}
                />
            ))
        ) : (
            !loading && <p>Nenhum produto encontrado.</p>
        )}

        {/*<Button variant="contained" onClick={buscarProdutos}>Buscar</Button>*/}
        <Button variant="contained" onClick={() => {navigate("/carrinho")}}>Carrinho</Button>

    </div>
}

export default ProdutoList;