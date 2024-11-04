import {useEffect, useState} from "react";
import axios from "axios";
import './ClienteForm.css'

function getClientes() {
    return axios.get('http://localhost:8080/api/cliente');
}

function Cliente(props) {
    const cliente = props.cliente;

    return (
        <div>
            <p>{cliente.nome} {cliente.email}</p>
        </div>
    )
}

function ClienteList() {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        buscarClientes();
    }, []);

    const buscarClientes = () => {
        getClientes()
            .then(resultado => setClientes(resultado.data.content))
            .catch(error => console.log(error));
    }

    return <div>
        {clientes.map((cliente) => {
            return (<Cliente cliente={cliente}/>)
        })}
    </div>
}

export default ClienteList;