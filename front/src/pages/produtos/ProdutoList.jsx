import axios from "axios";
import {useEffect, useState} from "react";
import './produtos.css'
import * as React from 'react';
import Button from '@mui/material/Button';

function getProdutos() {
    return axios.get('http://localhost:8080/api/produto')
}

function Produto(props) {
    const produto = props.produto;
    return (<div className="produtos">
        <p>Descrição: {produto.descricao}</p>
        <p>Preço: {produto.preco}</p>
        <img src={produto.caminhoimagem} width="250" height="250"/>
    </div>)
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