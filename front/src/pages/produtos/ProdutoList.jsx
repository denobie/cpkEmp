import axios from "axios";
import {useEffect, useState} from "react";
import './produtos.css'
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function getProdutos() {
    return axios.get('http://localhost:8080/api/produto')
}

function Produto(props) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    }

    const produto = props.produto;
    return (
        <div className="div-list">
            <div className="produtos">
                <div className="div-img-produto">
                    <img src={produto.caminhoimagem} width="250" height="250"/>
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
                        <Button variant="contained" startIcon={<AddShoppingCartIcon />}>Adicionar ao Carrinho</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProdutoList() {

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);


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

    console.log(produtos);

    return <div>Lista de Produtos

        {loading ? <div>loading...</div> : null}


        {produtos.map((produto) => {
            return (<Produto produto={produto}/>)
        })}

        <button onClick={buscarProdutos}>Buscar</button>
        <Button variant="contained" onClick={buscarProdutos}>Buscar</Button>
        <a href={"/produtos/novo"}>Novo Produto</a>

    </div>
}

export default ProdutoList;