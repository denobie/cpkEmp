import * as React from 'react';
import {useEffect, useState} from "react";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";
import {Alert, IconButton, InputAdornment} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

const clienteVazio= {
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cep: '',
    endereco: '',
    numeroResidencia: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    admin: 'N'
}

function consultarViaCep(cep){
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
        });
}

function ClienteForm() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [stateSnackbar, setStateSnackbar] = useState({
        open: false,
    });
    const [cliente, setCliente] = useState(clienteVazio);

    const handleClose = () => {
        setStateSnackbar({ ...stateSnackbar, open: false });
    };

    useEffect(() => {
        if (id === 'novo' || id === 'novoLogin') {
            return;
        }

        axios.get(`http://localhost:8080/api/cliente/${id}`)
            .then(res => {setCliente(res.data);})
    }, [id]);

    const salvar = () => {
        if (id === 'novo' || id === 'novoLogin') {
            axios.post('http://localhost:8080/api/cliente', cliente)
                .then(() => {
                    setStateSnackbar(
                        {...stateSnackbar,
                            open: true,
                            severity: 'success',
                            message: 'Cliente Cadastrado com Sucesso!'
                        }
                    )
                    if (id === 'novoLogin'){
                        navigate("/")
                    }
                })
                .catch(() => {
                    setStateSnackbar(
                        {...stateSnackbar,
                            open: true,
                            severity: 'error',
                            message: 'Erro ao Cadastrar Cliente!'
                        }
                    )
                })
        }else {
            axios.put(`http://localhost:8080/api/cliente/${id}`, cliente)
                .then(() => {
                    setStateSnackbar(
                        {...stateSnackbar,
                            open: true,
                            severity: 'success',
                            message: 'Cliente Atualizado com Sucesso!'
                        }
                    )
                })
                .catch(() => {
                    setStateSnackbar(
                        {...stateSnackbar,
                            open: true,
                            severity: 'error',
                            message: 'Erro ao Atualizar Cliente!'
                        }
                    )
                })
        }
    }

    const buscarCEP = (cep) => {
        consultarViaCep(cep)
            .then(resultado => setCliente({...cliente,
                endereco: resultado.data.logradouro,
                bairro: resultado.data.bairro,
                cidade: resultado.data.localidade,
                uf: resultado.data.uf}));
    }

    return <Box display="flex" flexDirection="column" alignItems="center" maxWidth="400px"
                margin="auto" mt={1}>
        <Box mb={1}>
            <TextField id={"nome"} name="nome" type="text" label="Nome Completo" variant="outlined" size="small"
                       value={cliente.nome}
                       onChange={
                            e => {
                               setCliente({...cliente, nome: e.target.value})
                           }
                       }/>
        </Box>
        <Box mb={1}>
            <TextField id={"email"} name="email" type="text" label="Email" variant="outlined" size="small"
                       value={cliente.email}
                       onChange={
                        e => {
                            setCliente({...cliente, email: e.target.value})
                        }
            }/>
        </Box>
        <Box mb={1}>
            <TextField id={"senha"} name="senha" type="password" label="Senha" variant="outlined" size="small"
                       value={cliente.senha}
                       onChange={
                           e => {
                               setCliente({...cliente, senha: e.target.value})
                           }
                       }/>
        </Box>
        <Box mb={1}>
            <TextField id={"telefone"} name="telefone" type="text" label="Telefone" variant="outlined" size="small"
                       value={cliente.telefone}
                       onChange={
                            e => {
                                setCliente({...cliente, telefone: e.target.value})
                            }
                       }
            />
        </Box>
        <Box mb={1}>
                <TextField id={"cep"} name="cep" type="text" label="Cep" variant="outlined" size="small"
                           sx={{width: '24.5ch' }}
                           value={cliente.cep}
                           onChange={e => setCliente({ ...cliente, cep: e.target.value })}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <IconButton
                                           variant="contained"
                                           size="small"
                                           onClick={() => buscarCEP(cliente.cep)}
                                       >
                                           <SearchIcon />
                                       </IconButton>
                                   </InputAdornment>
                               ),
                           }}
                />
        </Box>
        <Box mb={1}>
            <TextField id={"endereco"} name="endereco" type="text" label="Endereço" variant="outlined" size="small"
                       readOnly value={cliente.endereco ? cliente.endereco : ''}/>
        </Box>
        <Box mb={1}>
            <TextField id={"numero"} name="numero" type="text" label="Número da Residência" variant="outlined" size="small"
                       value={cliente.numeroResidencia}
                       onChange={
                    e => {
                    setCliente({...cliente, numeroResidencia: e.target.value})
                }
            }/>
        </Box>
        <Box mb={1}>
            <TextField id={"complemento"} name="complemento" type="text" label="Complemento (opcional)" variant="outlined" size="small"
                       value={cliente.complemento}
                       onChange={
                    e => {
                    setCliente({...cliente, complemento: e.target.value})
                }
            }/>
        </Box>
        <Box mb={1}>
            <TextField id={"bairro"} name="bairro" type="text" label="Bairro" variant="outlined" size="small"
                       readOnly value={cliente.bairro ? cliente.bairro : ''}
            />
        </Box>
        <Box mb={1}>
            <TextField id={"cidade"} name="cidade" type="text" label="Cidade" variant="outlined" size="small"
                       readOnly value={cliente.cidade ? cliente.cidade : ''} />
        </Box>
        <Box mb={1}>
            <TextField id={"uf"} name="uf" type="text" label="Estado" variant="outlined" size="small" readOnly
                       value={cliente.uf ? cliente.uf : ''}/>
        </Box>
        <Button variant="contained" size="small" startIcon={<SaveIcon/>} onClick={salvar}>Salvar</Button>
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
    </Box>
}

export default ClienteForm;
