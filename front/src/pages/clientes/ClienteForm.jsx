import {useState} from "react";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import axios from "axios";

function consultarViaCep(cep){
    return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
        });
}

function ClienteForm() {
    const [cliente, setCliente] = useState({});
    const [cep, setCEP] = useState({});

    const salvar = () => {
        axios.post('http://localhost:8080/api/cliente', cliente)
            .then(() => alert("Cliente Inserido"))
    }

    const buscarCEP = (cep) => {
        consultarViaCep(cep)
            .then(resultado => setCEP({...cep,
                                             logradouro: resultado.data.logradouro,
                                             bairro: resultado.data.bairro,
                                             cidade: resultado.data.localidade,
                                             uf: resultado.data.uf}))
    }

    return <div className={"container-cliente"}>
        <div>
            <label htmlFor="nome">Nome Completo</label>
            <input id={"nome"} name="descricao" type="text" onChange={
                e => {
                    setCliente({...cliente, nome: e.target.value})
                }
            }/>
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input id={"email"} name="email" type="text" onChange={
                e => {
                    setCliente({...cliente, email: e.target.value})
                }
            }/>
        </div>
        <div>
            <label htmlFor="telefone">Telefone</label>
            <input id={"telefone"} name="telefone" type="text" onChange={
                e => {
                    setCliente({...cliente, telefone: e.target.value})
                }
            }/>
        </div>
        <div>
            <label htmlFor="cep">Cep</label>
            <input id={"cep"} name="cep" type="text" onChange={
                e => {
                    setCliente({...cliente, cep: e.target.value})
                }
            }/>
            <Button variant="contained" size="small" startIcon={<SearchIcon/>} onClick={
                () => {
                    buscarCEP(cliente.cep)
                }
            }></Button>
        </div>
        <div>
            <label htmlFor="logradouro">Endereço</label>
            <input id={"logradouro"} name="logradouro" type="text" readOnly value={cep.logradouro}/>
        </div>
        <div>
            <label htmlFor="numero">Número da Residência</label>
            <input id={"numero"} name="numero" type="text"/>
        </div>
        <div>
            <label htmlFor="complemento">Complemento (opcional)</label>
            <input id={"complemento"} name="complemento" type="text"/>
        </div>
        <div>
            <label htmlFor="bairro">Bairro</label>
            <input id={"bairro"} name="bairro" type="text" readOnly value={cep.bairro}/>
        </div>
        <div>
            <label htmlFor="cidade">Cidade</label>
            <input id={"cidade"} name="cidade" type="text" readOnly value={cep.cidade}/>
        </div>
        <div>
            <label htmlFor="uf">Estado</label>
            <input id={"uf"} name="uf" type="text" readOnly value={cep.uf}/>
        </div>

        <Button variant="contained" size="small" startIcon={<SaveIcon/>} onClick={salvar}>Salvar</Button>
    </div>
}

export default ClienteForm;