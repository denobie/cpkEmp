import './Header.css'
import imgLogo from '../../imagens/cupcake100x100.png'
import {useContext, useEffect, useState} from "react";
import {CartContext} from "../../contexts/CartContext";
import {useNavigate} from "react-router-dom";

function Header() {
    const {cartItems} = useContext(CartContext);
    const [qtdeTotalCarrinho, setQtdeTotalCarrinho] = useState(0);
    const navigate = useNavigate();

    const cartCount = qtdeTotalCarrinho > 9 ? 'cart-count-10' : 'cart-count';

    useEffect(() => {
        if (cartItems.length > 0) {
            setQtdeTotalCarrinho(qtdeTotalCarrinho + 1)
        }
    }, [cartItems]);

    return (
        <header className="header">
            <div className="main">
                <div className="nav-left">
                    <img className="img-produto" src={imgLogo} width="85" height="85"/>
                    <h1 className="h1-nome-logo">Cupcake Emporium</h1>
                </div>
                <div className="nav-fill">
                </div>
                <div className="nav-right">
                    <div className="cart-icon">
                        <a href="/carrinho" className="link" onClick={() => {navigate("/carrinho")}}>
                            <span className={cartCount}>{qtdeTotalCarrinho}</span>
                            <div className="nav-carrinho"></div>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;