import {useContext, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";
import CardJustImage from "../../components/Card/CardJustImage";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import {Alert} from "@mui/material";
import {CarrinhoContext} from "../../contexts/CarrinhoContext";
import {useParams} from "react-router-dom";

const produtoVazio = {
    descricao: '',
    preco: 0,
    desconto: 0,
    caminhoimagem: ''
}
function ProdutoForm() {
      const [produto, setProduto] = useState(produtoVazio);
      const [stateSnackbar, setStateSnackbar] = useState({
        open: false,
      });

      const {id} = useParams();

    useEffect(() => {

        if (id === 'novo') {
            return;
        }
        axios.get(`http://localhost:8080/api/produto/${id}`)
            .then(res => {setProduto(res.data);})
    }, [id]);

    const handleClose = () => {
        setStateSnackbar({ ...stateSnackbar, open: false });
    };

      const salvar = () => {
          if (id === 'novo') {
              axios.post('http://localhost:8080/api/produto', produto)
                  .then(() => {
                      setStateSnackbar(
                          {...stateSnackbar,
                              open: true,
                              severity: 'success',
                              message: 'Produto Cadastrado com Sucesso!'
                          }
                      )
                  })
                  .catch(() => {
                      setStateSnackbar(
                          {...stateSnackbar,
                              open: true,
                              severity: 'error',
                              message: 'Erro ao Cadastrar Produto!'
                          }
                      )
                  })
          }else {
              axios.put(`http://localhost:8080/api/produto/${id}`, produto)
                  .then(() => {
                      setStateSnackbar(
                          {...stateSnackbar,
                              open: true,
                              severity: 'success',
                              message: 'Produto Atualizado com Sucesso!'
                          }
                      )
                  })
                  .catch(() => {
                      setStateSnackbar(
                          {...stateSnackbar,
                              open: true,
                              severity: 'error',
                              message: 'Erro ao Atualizar Produto!'
                          }
                      )
                  })
          }
      }

        return <Box display="flex" flexDirection="column" alignItems="center" maxWidth="600px"
                    margin="auto" mt={1}>
            <Box mb={1}>
                <TextField id={"descricao"} name="descricao" type="text" label="Descrição" variant="outlined" size="small"
                           sx={{ width: '300px' }}
                           value={produto.descricao}
                           onChange={e => {
                               setProduto({...produto, descricao: e.target.value})
                           }
                }/>
            </Box>
            <Box mb={1}>
                <TextField id="preco" name="preco" type="number" label="Preço" variant="outlined" size="small"
                           sx={{ width: '300px' }}
                           value={produto.preco}
                           onChange={e => {
                               setProduto({...produto, preco: e.target.value})
                           }
                }/>
            </Box>
            <Box mb={1}>
                <TextField id="desconto" name="desconto" type="number" label="Desconto" variant="outlined" size="small"
                           sx={{ width: '300px' }}
                           value={produto.desconto}
                           onChange={e => {
                               setProduto({...produto, desconto: e.target.value});
                           }
                }/>
            </Box>
            <Box mb={1}>
                <TextField id="urlImagen" name="urlImagen" type="text" label="Url Imagem" variant="outlined" size="small"
                           sx={{ width: '300px' }}
                           value={produto.caminhoimagem}
                           onChange={e => {
                               setProduto({...produto, caminhoimagem: e.target.value});}
                }/>
            </Box>
            <Box mb={1}>
                {produto.caminhoimagem?.trim() && (
                    <CardJustImage alt={produto.descricao} image={produto.caminhoimagem} height={300}/>
                )}
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

export default ProdutoForm;
