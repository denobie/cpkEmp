package br.com.gnk.cupcakeemporium.enumerable;

import br.com.gnk.cupcakeemporium.exceptions.ValidationException;
import lombok.Getter;


@Getter
public enum SituacaoPedido {
    ABERTO("A", "EM ABERTO"),
    FATURADO("F", "FATURADO"),
    PAGO("P", "PAGO");

    private final String value;
    private final String descricao;

    SituacaoPedido(String value, String descricao){
        this.value = value;
        this.descricao = descricao;
    }

    public static SituacaoPedido fromValue(String value){
        return switch (value) {
            case "A" -> ABERTO;
            case "F" -> FATURADO;
            case "P" -> PAGO;
            default -> throw new ValidationException(String.format("Situação Pedido '%s' não encontrada.", value));
        };
    }
}
