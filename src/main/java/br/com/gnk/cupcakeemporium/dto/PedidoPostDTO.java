package br.com.gnk.cupcakeemporium.dto;

import br.com.gnk.cupcakeemporium.entities.Pedido;
import br.com.gnk.cupcakeemporium.enumerable.FormaPagamento;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class PedidoPostDTO {
    private Long id = 0L;
    private LocalDate dataEmissao;
    private Long cliente;
    private List<PedidoItemDTO> itens = new ArrayList<>();
    private String formaPagamento;
    private Long quantidadeParcelas;

    public Pedido toEntity(){
        Pedido pedido = new Pedido();
        pedido.setFormaPagamento(FormaPagamento.fromValue(this.getFormaPagamento()));
        pedido.setQuantidadeParcelas(this.getQuantidadeParcelas());

        return pedido;
    }
}
