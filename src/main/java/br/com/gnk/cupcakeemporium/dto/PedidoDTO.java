package br.com.gnk.cupcakeemporium.dto;

import br.com.gnk.cupcakeemporium.entities.Pedido;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class PedidoDTO {
    private Long id;
    private LocalDate dataEmissao;
    private LocalDate dataFaturamento;
    private LocalDate dataPagamento;
    private ClienteDTO cliente;
    private List<PedidoItemDTO> itens = new ArrayList<>();
    private String situacaoPedido;
    private String formaPagamento;
    private Long quantidadeParcelas;

    public static PedidoDTO fromEntity(Pedido pedido){
        PedidoDTO pedidoDTO = new PedidoDTO();
        pedidoDTO.setId(pedido.getId());
        pedidoDTO.setDataEmissao(pedido.getDataEmissao());
        pedidoDTO.setDataFaturamento(pedido.getDataFaturamento());
        pedidoDTO.setDataPagamento(pedido.getDataPagamento());
        pedidoDTO.setCliente(ClienteDTO.fromEntity(pedido.getCliente()));
        pedidoDTO.setItens(pedido.getItens().stream().map(PedidoItemDTO::fromEntity).toList());
        pedidoDTO.setSituacaoPedido(pedido.getSituacaoPedido().getValue());
        pedidoDTO.setFormaPagamento(pedido.getFormaPagamento().getValue());
        pedidoDTO.setQuantidadeParcelas(pedido.getQuantidadeParcelas());

        return pedidoDTO;
    }
}
