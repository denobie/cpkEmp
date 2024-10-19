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

    public static ProdutoDTO fromEntity(Produto produto){
        ProdutoDTO produtoDTO = new ProdutoDTO();
        produtoDTO.setId(produto.getId());
        produtoDTO.setDescricao(produto.getDescricao());
        produtoDTO.setPreco(produto.getPreco());
        produtoDTO.setDesconto(produto.getDesconto());

        return produtoDTO;
    }

    public static Produto toEntity(ProdutoDTO produtoDTO){
        Produto produto = new Produto();
        produto.setId(produtoDTO.getId());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setDesconto(produtoDTO.getDesconto());

        return produto;
    }
}
