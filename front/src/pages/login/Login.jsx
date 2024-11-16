import React, {useContext, useState} from "react";
import './Login.css'
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

function Login() {
    const { handleSetUser } = useContext(UserContext);

    const [dadosLogin, setDadosLogin] = useState({
        email: '',
        senha: ''
    })

    const navigate = useNavigate();

    const login = () =>{
        axios.post('http://localhost:8080/api/usuario/login', dadosLogin)
            .then((response) => {
                handleSetUser(response.data);

                if (response.data.admin === 'S') {
                    navigate("/home");
                } else {
                    navigate("/catalogo");
                }
            })
            .catch((error) => {
                console.log(error.response.data);
                alert(error.response.data.message)
            })
    }

    return <div className={"div-login"}>
        <div className="container">
            <h1 className={"h1-login"}>Cupcake Emporium</h1>
            <h2 className={"h2-login"}>Bem-vindo(a)</h2>

            <label className={"label-login"}>Email</label>
            <input className={"input-login"} type="email" placeholder="email"
                   onChange={e => {
                       setDadosLogin({...dadosLogin, email: e.target.value})
                       }}
            />

            <label className={"label-login"}>Senha</label>
            <input className={"input-login"} type="password" placeholder="sua senha"
                   onChange={e => {
                       setDadosLogin({...dadosLogin, senha: e.target.value})
                   }}
            />

            <button className="btn" onClick={login}>Login</button>

            {/*<a href="/catalogo" className="link">Esqueceu sua senha?</a>*/}

            <button className="btn create-account" onClick={() => {navigate("/cliente/novoLogin")}}>Criar Conta</button>
        </div>
    </div>
}

export default Login;
