import {useEffect, useState} from "react";
import axios from "axios";
import './ClienteForm.css'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

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

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell >Email</TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientes.map((row) => (
                        <TableRow key={row.nome}>
                            <TableCell component="th" scope="row">
                                {row.nome}
                            </TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell align={'right'}>
                                <Link to={`/clientes/${row.id}`}>
                                    <Button>Editar</Button>
                                </Link>
                                <Button>Excluir</Button>
                            </TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}

export default ClienteList;