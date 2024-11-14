import {useContext, useState} from "react";
import axios from "axios";
import {CarrinhoContext} from "../../contexts/CarrinhoContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import PaidIcon from '@mui/icons-material/Paid';

function Checkout(){
    const {cartItems} = useContext(CarrinhoContext)
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
            <Button variant="contained" startIcon={<PaidIcon />} onClick={fecharPedido}>Pagar</Button>
        </div>
    )
}

export default Checkout;