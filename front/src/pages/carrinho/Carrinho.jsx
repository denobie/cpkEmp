import {useContext, useState} from "react";
import {CarrinhoContext} from '../../contexts/CarrinhoContext';
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import {Link} from "react-router-dom";

function Carrinho() {
    const {cartItems, handleClearCart} = useContext(CarrinhoContext);

    return (
        <div>
            <h1>Carrinho</h1>
            {cartItems.length === 0
                ? (
                    <p>Seu carrinho de compras está vazio.</p>
                )
                : (
                    <>
                        <p>{JSON.stringify(cartItems)}</p>
                        {cartItems.map((item) => (
                            <div>
                                <p>{item.name}</p>
                                <p>Quantidade: {item.quantidade}</p>
                            </div>
                        ))}
                    </>
                )
            }

            <div style={{ display: "flex", gap: "2px", alignItems: "center", justifyContent: "center"}}>
                <Link to={"/checkout"} style={{textDecoration: "none"}}>
                    <Button variant="contained" startIcon={<PaymentIcon />}>Fechar Pedido</Button>
                </Link>
                <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleClearCart}>Limpar Carrinho</Button>
            </div>
        </div>
    );
}

export default Carrinho;

