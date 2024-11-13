import './Header.css'
import imgLogo from '../../imagens/cupcake100x100.png'
import {useContext} from "react";
import {CarrinhoContext} from "../../contexts/CarrinhoContext";
import {Link} from "react-router-dom";

function Header() {
    const {cartCount} = useContext(CarrinhoContext);

    const valueCountCart = cartCount > 9 ? 'cart-count-10' : 'cart-count';

    return (
        <header className="header">
            <div className="main">
                <div className="nav-left">
                    <Link className="link" to={"/home"}>
                        <img className="img-produto" src={imgLogo} width="85" height="85"/>
                    </Link>
                    <h1 className="h1-nome-logo">Cupcake Emporium</h1>
                </div>
                <div className="nav-fill">
                </div>
                <div className="nav-right">
                    <div className="cart-icon">
                        <Link className="link" to={"/carrinho"} >
                            <span className={valueCountCart}>{cartCount}</span>
                            <div className="nav-carrinho"></div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;