package br.com.gnk.cupcakeemporium.entities;

import br.com.gnk.cupcakeemporium.enumerable.FormaPagamento;
import br.com.gnk.cupcakeemporium.enumerable.SituacaoPedido;
import br.com.gnk.cupcakeemporium.enumerable.converter.FormaPagamentoEnumConverter;
import br.com.gnk.cupcakeemporium.enumerable.converter.SituacaoPedidoEnumConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dataemissao")
    @PastOrPresent
    private LocalDate dataEmissao;

    @Column(name = "datafaturamento")
    @PastOrPresent
    private LocalDate dataFaturamento;

    @Column(name = "datapagamento")
    @PastOrPresent
    private LocalDate dataPagamento;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "cliente", referencedColumnName = "id")
    @NotNull
    private Cliente cliente;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PedidoItem> itens = new ArrayList<>();

    @Column(name = "situacao")
    @Convert(converter = SituacaoPedidoEnumConverter.class)
    private SituacaoPedido situacaoPedido;

    @Column(name = "formapagamento")
    @Convert(converter = FormaPagamentoEnumConverter.class)
    private FormaPagamento formaPagamento;

    @Column(name = "quantidadeparcelas")
    private Long quantidadeParcelas;
}
