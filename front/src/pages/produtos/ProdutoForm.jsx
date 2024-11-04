import {useState} from "react";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";
import CardJustImage from "../../components/Card/CardJustImage";

function ProdutoForm() {
      const [produto, setProduto] = useState({});

      const salvar = () => {
          axios.post('http://localhost:8080/api/produto', produto)
              .then(() => alert("Produto inserido"))
      }

        return <div>
            <div>
                <label htmlFor="descricao">Descrição</label>
                <input id={"descricao"} name="descricao" type="text" value={produto.descricao} onChange={e => {
                    setProduto({...produto, descricao: e.target.value})
                }}/>
            </div>
            <div>
                <label htmlFor="preco">Preço</label>
                <input id="preco" name="preco" type="number" value={produto.preco} onChange={e => {
                    setProduto({...produto, preco: e.target.value});
                }}/>
                <label htmlFor="desconto">Desconto</label>
                <input id="desconto" name="desconto" type="number" value={produto.desconto} onChange={e => {
                    setProduto({...produto, desconto: e.target.value});
                }}/>
            </div>
            <div>
                <label htmlFor="urlImagen">Url Imagem</label>
                <input id="urlImagen" name="urlImagen" type="texte" value={produto.caminhoimagem} onChange={e => {
                    setProduto({...produto, caminhoimagem: e.target.value});
                }}/>
                {produto.caminhoimagem?.trim() && (
                    <CardJustImage alt={produto.descricao} image={produto.caminhoimagem} />
                )}
            </div>

            <Button variant="contained" size="small" startIcon={<SaveIcon/>} onClick={salvar}>Salvar</Button>
        </div>
}

export default ProdutoForm;