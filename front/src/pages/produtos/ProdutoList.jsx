import axios from "axios";
import {useContext, useEffect, useState} from "react";
import './ProdutoList.css'
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {CarrinhoContext} from '../../contexts/CarrinhoContext';
import {useNavigate} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import {Alert} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function getProdutos() {
    return axios.get('http://192.168.18.12:8080/api/produto')
}

function Produto({produto}) {
    const { handleAddCart, handleRemoveFromCart } = useContext(CarrinhoContext);
    const [stateSnackbar, setStateSnackbar] = useState({
        open: false,
    });

    const handleClose = () => {
        setStateSnackbar({ ...stateSnackbar, open: false });
    };

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
                            <p align="left">{produto.descricao}</p>
                        </h2>
                    </div>
                    <div className="div-preco">
                        <p>{formatCurrency(produto.preco)}</p>
                    </div>
                    <div>
                        <Button variant="contained" startIcon={<AddShoppingCartIcon />} onClick={
                            () => {
                                handleAddCart(produto, 1);
                                setStateSnackbar({ ...stateSnackbar,
                                    open: true,
                                    severity: "success",
                                    message: "Produto Adicionado ao Carrinho!"});
                            }
                        }>Adicionar ao Carrinho</Button>
                    </div>
                    <div>
                        <Button variant="text" size="small" startIcon={<DeleteOutlineIcon />} onClick={
                            () => {
                                handleRemoveFromCart(produto);
                                setStateSnackbar({ ...stateSnackbar,
                                    open: true,
                                    severity:"error",
                                    message: "Produto Removido do Carrinho!"});
                            }
                        }>Remover do Carrinho</Button>
                    </div>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={stateSnackbar.open}
                        onClose={handleClose}
                        TransitionComponent={Slide}
                        key={stateSnackbar.vertical + stateSnackbar.horizontal}
                        autoHideDuration={1500}>
                        <Alert
                            onClose={handleClose}
                            severity={stateSnackbar.severity}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {stateSnackbar.message}
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </div>
    )
}

function ProdutoList() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

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
        {/*<Button variant="contained" onClick={() => {navigate("/carrinho")}}>Carrinho</Button>*/}

    </div>
}

export default ProdutoList;