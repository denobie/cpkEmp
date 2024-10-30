package br.com.gnk.cupcakeemporium.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "pedidoitem")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class PedidoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "pedido", referencedColumnName = "id")
    @NotNull
    private Pedido pedido;

    private Long quantidade;

    private BigDecimal preco;

    private BigDecimal desconto;

    @Column(name = "valortotal")
    private BigDecimal valorTotal;

    @ManyToOne
    @JoinColumn(name = "produto", referencedColumnName = "id")
    @NotNull
    private Produto produto;
}
