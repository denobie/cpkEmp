import {useState} from "react";
import axios from "axios";

function ProdutoForm(props) {
        const [produto, setProduto] = useState({desconto: 0});

      const salvar = () => {


          axios.post('http://localhost:8080/api/produto', produto)
              .then(() => alert("Produto inserido"))
      }


        return <div>
            Formulario


            <div>
                <label htmlFor="descricao">Descrição</label>
                <input id={"descricao"} name="descricao" type="text" value={produto.descricao} onChange={e => {
                    const novoProduto = {...produto}

                        novoProduto.descricao = e.target.value;
                    setProduto({...novoProduto})
                }}/>
            </div>
            <div>
                <label htmlFor="preco">Preço</label>
                <input id="preco" name="preco" type="number" value={produto.preco} onChange={e => {
                    setProduto({...produto, preco: e.target.value});
                }}/>
            </div>
            <button onClick={salvar}>Salvar</button>

        </div>
}

export default ProdutoForm;