import React from "react";
import './Login.css'
import {useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const login = () =>{
        navigate("/home");
    }

    return <div className={"div-login"}>
        <div className="container">
            <h1 className={"h1-login"}>Cupcake Emporium</h1>
            <h2 className={"h2-login"}>Bem-vindo(a)</h2>

            <label className={"label-login"}>Email</label>
            <input className={"input-login"} type="email" placeholder="email"/>

            <label className={"label-login"}>Senha</label>
            <input className={"input-login"} type="password" placeholder="sua senha"/>

            <button className="btn" onClick={login}>Login</button>

            <a href="/produtos" className="link">Esqueceu sua senha?</a>

            <button className="btn create-account">Criar Conta</button>
        </div>
    </div>
}

export default Login;