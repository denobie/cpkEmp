package br.com.gnk.cupcakeemporium.dto;

import br.com.gnk.cupcakeemporium.entities.Pedido;
import br.com.gnk.cupcakeemporium.entities.PedidoItem;
import br.com.gnk.cupcakeemporium.entities.Produto;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PedidoItemDTO {
    private String id;
    private Long quantidade;
    private BigDecimal preco;
    private BigDecimal desconto;
    private BigDecimal valorTotal;
    private ProdutoDTO produto;

    public static PedidoItemDTO fromEntity(PedidoItem pedidoItem){
        PedidoItemDTO pedidoItemDTO = new PedidoItemDTO();
        pedidoItemDTO.setId(pedidoItem.getId());
        pedidoItemDTO.setQuantidade(pedidoItem.getQuantidade());
        pedidoItemDTO.setPreco(pedidoItem.getPreco());
        pedidoItemDTO.setDesconto(pedidoItem.getDesconto());
        pedidoItemDTO.setValorTotal(pedidoItem.getValorTotal());
        pedidoItemDTO.setProduto(ProdutoDTO.fromEntity(pedidoItem.getProduto()));

        return pedidoItemDTO;
    }

    public PedidoItem toEntity(Pedido pedido, Produto produto){
        PedidoItem pedidoItem = new PedidoItem();
        pedidoItem.setId(this.getId());
        pedidoItem.setQuantidade(this.getQuantidade());
        pedidoItem.setPreco(this.getPreco());
        pedidoItem.setDesconto(this.getDesconto());
        pedidoItem.setProduto(produto);
        pedidoItem.setPedido(pedido);

        return pedidoItem;
    }
}
