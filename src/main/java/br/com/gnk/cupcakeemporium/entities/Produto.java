package br.com.gnk.cupcakeemporium.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "produto")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Produto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 250)
    @NotNull
    private String descricao;

    @NotNull
    private BigDecimal preco = BigDecimal.ZERO;

    @NotNull
    private BigDecimal desconto = BigDecimal.ZERO;

    @Column(length = 4000)
    private String caminhoimagem;

    public Produto merge(Produto produtoToMerge){
        this.setDescricao(produtoToMerge.getDescricao());
        this.setPreco(produtoToMerge.getPreco());
        this.setDesconto(produtoToMerge.getDesconto());

        return this;
    }
}
