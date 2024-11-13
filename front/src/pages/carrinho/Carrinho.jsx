import {useContext, useState} from "react";
import {CarrinhoContext} from '../../contexts/CarrinhoContext';
import Button from "@mui/material/Button";
import PaidIcon from '@mui/icons-material/Paid';
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';

function Carrinho() {
    const {cartItems, handleClearCart} = useContext(CarrinhoContext);
    const [pedido, setPedido] = useState([]);

/*{
    "dataEmissao": "2024-10-29",
    "cliente": "1",
    "itens": [
        {
            "preco": 4.00,
            "desconto": 0.00,
            "quantidade": 2,
            "produto": {
                "id": 39
            }
        },
        {
            "preco": 1.5,
            "desconto": 0.00,
            "quantidade": 1,
            "produto": {
                "id": 4
            }
        },
        {
            "preco": 1.5,
            "desconto": 0.50,
            "quantidade": 2,
            "produto": {
                "id": 3
            }
        }
    ],
    "formaPagamento": "A",
    "quantidadeParcelas": 0
}*/

    const fecharPedido = () => {
        const pedidoFechado = ({...pedido,
            dataEmissao: new Date().toJSON(),
            itens: cartItems
        });

        cartItems.map((item) =>(
            alert(item.quantidade)
        ))

        axios.post('http://localhost:8080/api/pedido', pedidoFechado)
            .then(() => {
                alert("teste")
                }
            )
            .catch(() => {
                alert("bayBlade")
                }
            )
    }

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
                <Button variant="contained" startIcon={<PaidIcon />} onClick={fecharPedido}>Fechar Pedido</Button>
                <Button variant="contained" startIcon={<DeleteIcon />} onClick={handleClearCart}>Limpar Carrinho</Button>
            </div>
        </div>
    );
}

export default Carrinho;

