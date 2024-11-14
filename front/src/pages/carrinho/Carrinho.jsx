import {useContext, useState} from "react";
import {CarrinhoContext} from '../../contexts/CarrinhoContext';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import {Link} from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Produto({produto}) {
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
                        <h3 className="h3-dados">
                            <p>{formatCurrency(produto.preco)}</p>
                        </h3>
                    </div>
                    <div className="div-preco">
                        <h3 className="h3-dados">
                            <p>Quantidade: {produto.quantidade}</p>
                        </h3>
                    </div>
                    <div className="div-preco">
                        <h3 className="h3-dados">
                            <p>Valor Total: {formatCurrency(((produto.preco - produto.desconto) * produto.quantidade))}</p>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Carrinho() {
    const {cartItems, cartTotal, handleClearCart} = useContext(CarrinhoContext);

    return (
        <div>
            <h1>Carrinho</h1>
            {cartItems.length === 0
                ? (
                    <p>Seu carrinho de compras está vazio.</p>
                )
                : (
                    <div>
                        {cartItems.map((item) => (
                            <Produto produto={item}/>
                        ))}
                    </div>
                )
            }

            <div style={{ display: "flex", gap: "2px", alignItems: "center", justifyContent: "center"}}>
                <Link to={"/catalogo"} style={{textDecoration: "none"}}>
                    <Button variant="contained" startIcon={<ShoppingCartOutlinedIcon />}>Continuar Comprando</Button>
                </Link>
                {(cartItems.length !== 0) && (
                    <>
                        <Link to={"/checkout"} style={{textDecoration: "none"}}>
                            <Button variant="contained" startIcon={<PaymentIcon />}>Fechar Pedido</Button>
                        </Link>
                        <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleClearCart}>Limpar Carrinho</Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Carrinho;

