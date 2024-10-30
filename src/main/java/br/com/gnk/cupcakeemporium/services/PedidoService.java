package br.com.gnk.cupcakeemporium.services;

import br.com.gnk.cupcakeemporium.dto.PedidoDTO;
import br.com.gnk.cupcakeemporium.dto.PedidoPostDTO;
import br.com.gnk.cupcakeemporium.entities.Cliente;
import br.com.gnk.cupcakeemporium.entities.Pedido;
import br.com.gnk.cupcakeemporium.entities.PedidoItem;
import br.com.gnk.cupcakeemporium.entities.Produto;
import br.com.gnk.cupcakeemporium.enumerable.SituacaoPedido;
import br.com.gnk.cupcakeemporium.exceptions.RestException;
import br.com.gnk.cupcakeemporium.exceptions.ValidationException;
import br.com.gnk.cupcakeemporium.repositories.ClienteRepository;
import br.com.gnk.cupcakeemporium.repositories.PedidoRepository;
import br.com.gnk.cupcakeemporium.repositories.ProdutoRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class PedidoService {
    private final PedidoRepository pedidoRepository;
    private final ClienteRepository clienteRepository;
    private final ProdutoRepository produtoRepository;

    public PedidoDTO findById(Long id){
        return PedidoDTO.fromEntity(foundPedido(id));
    }

    private Pedido foundPedido(Long id){
        return this.pedidoRepository.findById(id)
                .orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, String.format("Pedido '%d' não encontrado.", id)));
    }

    public Page<PedidoDTO> findAll(Pageable pageable) {
        return this.pedidoRepository.findAll(pageable).map(PedidoDTO::fromEntity);
    }

    public PedidoDTO insert(@Valid PedidoPostDTO pedidoPostDTO) {
        Pedido pedidoToSave = pedidoPostDTO.toEntity();

        pedidoToSave.setDataEmissao(LocalDate.now());
        pedidoToSave.setSituacaoPedido(SituacaoPedido.ABERTO);
        pedidoToSave.setCliente(this.foundCliente(pedidoPostDTO.getCliente()));

        pedidoPostDTO.getItens().stream().map(
                pedidoItemDTO -> {
                    PedidoItem pedidoItemToSave = pedidoItemDTO.toEntity(pedidoToSave, this.foundProduto(pedidoItemDTO.getProduto().getId()));

                    pedidoItemToSave.setValorTotal(pedidoItemDTO.getPreco().subtract(pedidoItemDTO.getDesconto()).multiply(BigDecimal.valueOf(pedidoItemDTO.getQuantidade())));

                   return pedidoItemToSave;
                }
        ).forEach(pedidoToSave.getItens()::add);

        return PedidoDTO.fromEntity(this.pedidoRepository.save(pedidoToSave));
    }

    private Cliente foundCliente(Long id){
        return this.clienteRepository.findById(id)
                .orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, String.format("Cliente '%d' não encontrado.", id)));
    }

    private Produto foundProduto(Long id){
        return this.produtoRepository.findById(id)
                .orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, String.format("Produto '%d' não encontrado", id)));
    }

    public void faturarPedido(Long id) {
        Pedido pedidoToUpdate = foundPedido(id);

        if (!pedidoToUpdate.getSituacaoPedido().equals(SituacaoPedido.ABERTO)){
            throw new ValidationException(String.format("Para Faturar o Pedido o mesmo precisa estar Em Aberto. Situação Atual: '%s'", pedidoToUpdate.getSituacaoPedido().getDescricao()));
        }

        pedidoToUpdate.setSituacaoPedido(SituacaoPedido.FATURADO);
        pedidoToUpdate.setDataFaturamento(LocalDate.now());

        this.pedidoRepository.save(pedidoToUpdate);
    }

    public void pagarPedido(Long id) {
        Pedido pedidoToUpdate = foundPedido(id);

        if (!pedidoToUpdate.getSituacaoPedido().equals(SituacaoPedido.FATURADO)){
            throw new ValidationException(String.format("Para Pagar o Pedido o mesmo precisa estar Faturado. Situação Atual: '%s'", pedidoToUpdate.getSituacaoPedido().getDescricao()));
        }

        pedidoToUpdate.setSituacaoPedido(SituacaoPedido.PAGO);
        pedidoToUpdate.setDataPagamento(LocalDate.now());

        this.pedidoRepository.save(pedidoToUpdate);
    }
}
