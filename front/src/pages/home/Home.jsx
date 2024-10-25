import React from "react";
import './home.css'
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const login = () =>{
        navigate("/produtos");
    }

    return <div className={"div-login"}>
        <div className="container">
            <h1>Cupcake Emporium</h1>
            <h2>Bem-vindo(a)</h2>

            <label>Email</label>
            <input type="email" placeholder="email"/>

            <label>Senha</label>
            <input type="password" placeholder="sua senha"/>

            <button className="btn" onClick={login}>Login</button>

            <a href="/produtos" className="link">Esqueceu sua senha?</a>

            <button className="btn create-account">Criar Conta</button>
        </div>
    </div>
}

export default Home;