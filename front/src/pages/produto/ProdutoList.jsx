import {useEffect, useState} from "react";
import axios from "axios";
import {Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import * as React from "react";

function getProdutos() {
    return axios.get('http://localhost:8080/api/produto');
}

function ProdutoList() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [stateSnackbar, setStateSnackbar] = useState({
        open: false,
    });

    useEffect(() => {
        buscarProdutos();
    }, []);

    const handleClose = () => {
        setStateSnackbar({ ...stateSnackbar, open: false });
    };

    const buscarProdutos = () => {
        getProdutos()
            .then(resultado => setProdutos(resultado.data.content))
            .catch(error => console.log(error));
    }

    function deleteProduto(id) {
        if (id > 0){
            axios.delete(`http://localhost:8080/api/produto/${id}`)
                .then(() => {
                    setStateSnackbar(
                        {...stateSnackbar,
                            open: true,
                            severity: 'success',
                            message: 'Produto Excluído com Sucesso!'
                        }
                    );
                    buscarProdutos();
                })
                .catch((error) => {
                    setStateSnackbar(
                        {...stateSnackbar,
                            open: true,
                            severity: 'error',
                            message: 'Não é possível excluir um produto vinculado a um pedido.'
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
                            <TableCell>Código</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell>Desconto</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {produtos.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.descricao}</TableCell>
                                <TableCell>{row.preco.toFixed(2)}</TableCell>
                                <TableCell>{row.desconto.toFixed(2)}</TableCell>
                                <TableCell align={'right'}>
                                    <Link to={`/produto/${row.id}`}>
                                        <Button>Editar</Button>
                                    </Link>
                                    <Button onClick={() => deleteProduto(row.id)}>Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{float: "right"}}>
                <Link to={`/produto/novo`}>
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

export default ProdutoList;
