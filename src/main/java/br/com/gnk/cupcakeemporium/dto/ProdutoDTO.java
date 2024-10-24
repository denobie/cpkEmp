package br.com.gnk.cupcakeemporium.dto;

import br.com.gnk.cupcakeemporium.entities.Produto;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProdutoDTO {
    private Long id;
    private String descricao;
    private BigDecimal preco;
    private BigDecimal desconto;
    private String caminhoimagem;

    public static ProdutoDTO fromEntity(Produto produto){
        ProdutoDTO produtoDTO = new ProdutoDTO();
        produtoDTO.setId(produto.getId());
        produtoDTO.setDescricao(produto.getDescricao());
        produtoDTO.setPreco(produto.getPreco());
        produtoDTO.setDesconto(produto.getDesconto());
        produtoDTO.setCaminhoimagem(produto.getCaminhoimagem());

        return produtoDTO;
    }

    public Produto toEntity(){
        Produto produto = new Produto();
        produto.setId(this.getId());
        produto.setDescricao(this.getDescricao());
        produto.setPreco(this.getPreco());
        produto.setDesconto(this.getDesconto());
        produto.setCaminhoimagem(this.getCaminhoimagem());

        return produto;
    }
}
