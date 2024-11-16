import './Header.css'
import imgLogo from '../../imagens/cupcake100x100.png'
import {useContext, useState} from "react";
import {CarrinhoContext} from "../../contexts/CarrinhoContext";
import {Link} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";
import TextField from "@mui/material/TextField";
import {IconButton, InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import Box from "@mui/material/Box";

function Header({ onSearch }) {
    const { userLogged } = useContext(UserContext);
    const {cartCount} = useContext(CarrinhoContext);
    const [consultaProduto, setConsultaProduto] = useState("");

    const handleSearch = () => {
        onSearch(consultaProduto);
    };

    const valueCountCart = cartCount > 9 ? 'cart-count-10' : 'cart-count';

    return (
        <header className="header">
            <div className="main">
                <div className="nav-left">
                    <Link className="link" to={userLogged.admin === 'S' ? "/home" : "/catalogo"}>
                        <img className="img-produto" src={imgLogo} width="85" height="85"/>
                    </Link>
                    <div>
                    <h1 className="h1-nome-logo">Cupcake Emporium</h1>
                    <h2 className="h2-user">Olá, {userLogged.nome}</h2>
                    </div>
                </div>
                <div className="nav-fill">
                <Box sx={{ width: 500, maxWidth: '100%' }}>
                        <TextField
                            fullWidth
                            value={consultaProduto}
                            onChange={(e) => setConsultaProduto(e.target.value)}
                            placeholder="Buscar Produtos"
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSearch();
                                    event.preventDefault();
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            variant="contained"
                                            size="small"
                                            onClick={handleSearch}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
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
