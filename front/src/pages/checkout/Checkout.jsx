import {useContext, useState} from "react";
import axios from "axios";
import {CarrinhoContext} from "../../contexts/CarrinhoContext";
import Button from "@mui/material/Button";
import PaidIcon from '@mui/icons-material/Paid';
import {CardPaymentMethod} from "../../components/Card/CardPaymentMethod";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import {Alert} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import './Checkout.css'
import {UserContext} from "../../contexts/UserContext";

function Checkout(){
    const navigate = useNavigate();
    const {cartItems, handleClearCart} = useContext(CarrinhoContext)
    const { userLogged } = useContext(UserContext);
    const [formaPagamento, setFormaPagamento] = useState('a');
    const [qtdeParcelas, setQtdeParcelas] = useState(1);
    const [stateSnackbar, setStateSnackbar] = useState({
        open: false,
    });
    const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

    const navigateToCatalogo = () => {
        navigate("/catalogo")
    }

    const handleClose = () => {
        setStateSnackbar({ ...stateSnackbar, open: false });

        if (pedidoFinalizado){
            handleClearCart();
            navigateToCatalogo();
        }
    };

    const handlePaymentMethod = (paymentMethod) => {
        setFormaPagamento(paymentMethod)
    }

    const handlePaymentAmount = (onPaymentAmount) => {
        setQtdeParcelas(onPaymentAmount)
    }

    function getItems(cartItems) {
        const itens = cartItems.map(item => ({
            preco: item.preco,
            desconto: item.desconto,
            quantidade: item.quantidade,
            produto: {
                id: item.id
            }

        }));

        return itens;
    }

    const fecharPedido = () => {
        const pedidoFechado = ({
            dataEmissao: new Date().toJSON(),
            cliente: userLogged.id,
            itens: getItems(cartItems),
            formaPagamento: formaPagamento.toUpperCase(),
            quantidadeParcelas: qtdeParcelas
        });

        axios.post('http://localhost:8080/api/pedido', pedidoFechado)
            .then(() => {
                setPedidoFinalizado(true);
                setStateSnackbar({ ...stateSnackbar,
                    open: true,
                    severity: "success",
                    message: "Pedido Finalizado com Sucesso!"});
                }
            )
            .catch(() => {
                setPedidoFinalizado(false);
                setStateSnackbar({ ...stateSnackbar,
                    open: true,
                    severity: "error",
                    message: "Falha ao Finalizar Pedido!"});
                }
            )
    }

    return (
        <div style={{padding: '30px', margin: '30px'}}>
            <CardPaymentMethod onPaymentMethod={handlePaymentMethod} onPaymentAmount={handlePaymentAmount}/>
            <div className="div-payment">
                <Link to={"/carrinho"} style={{textDecoration: "none"}}>
                    <Button variant="contained" startIcon={<ShoppingCartOutlinedIcon />}>Voltar ao Carrinho</Button>
                </Link>
                <Button variant="contained" startIcon={<PaidIcon />} onClick={fecharPedido}>Pagar</Button>
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
    )
}

export default Checkout;
