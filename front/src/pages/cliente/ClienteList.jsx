import {useEffect, useState} from "react";
import axios from "axios";
import './ClienteForm.css'
import {Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import * as React from "react";

function getClientes() {
    return axios.get('http://localhost:8080/api/cliente');
}

function ClienteList() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [stateSnackbar, setStateSnackbar] = useState({
        open: false,
    });

    useEffect(() => {
        buscarClientes();
    }, []);

    const handleClose = () => {
        setStateSnackbar({ ...stateSnackbar, open: false });
    };

    const buscarClientes = () => {
        getClientes()
            .then(resultado => setClientes(resultado.data.content))
            .catch(error => console.log(error));
    }

    function deleteCliente(id) {
        if (id > 0){
            axios.delete(`http://localhost:8080/api/cliente/${id}`)
                .then(() => {
                    setStateSnackbar(
                        {...stateSnackbar,
                            open: true,
                            severity: 'success',
                            message: 'Cliente Excluído com Sucesso!'
                        }
                    );
                    buscarClientes();
                })
                .catch((error) => {
                    setStateSnackbar(
                        {...stateSnackbar,
                            open: true,
                            severity: 'error',
                            message: 'Não é possível excluir um cliente vinculado a um pedido.'
                        }
                    )
                })
        }
    }

    return (
        <Box m={5}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700, backgroundColor: "#ede4f2"}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientes.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.nome}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.telefone}</TableCell>
                                <TableCell align={'right'}>
                                    <Link to={`/cliente/${row.id}`}>
                                        <Button>Editar</Button>
                                    </Link>
                                    <Button onClick={() => deleteCliente(row.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{float: "right"}}>
                <Link to={`/cliente/novo`}>
                    <Button>Novo</Button>
                </Link>
            </div>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                open={stateSnackbar.open}
                onClose={handleClose}
                TransitionComponent={Slide}
                key={stateSnackbar.vertical + stateSnackbar.horizontal}
                autoHideDuration={3000}>
                <Alert
                    onClose={handleClose}
                    severity={stateSnackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {stateSnackbar.message}
                </Alert>
            </Snackbar>
    </Box>)
}

export default ClienteList;
