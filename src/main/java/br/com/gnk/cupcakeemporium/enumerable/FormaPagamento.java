package br.com.gnk.cupcakeemporium.enumerable;

import br.com.gnk.cupcakeemporium.exceptions.ValidationException;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FormaPagamento {
    AVISTA("A", "À VISTA"),
    CARTAO_CREDITO("C", "CARTÃO DE CRÉDITO"),
    CARTAO_DEBITO("D", "CARTÃO DE DÉBITO"),
    PIX("P", "PIX");

    private final String value;
    private final String descricao;

    public static FormaPagamento fromValue(String value){
        return switch (value){
            case "A" -> AVISTA;
            case "C" -> CARTAO_CREDITO;
            case "D" -> CARTAO_DEBITO;
            case "P" -> PIX;
            default -> throw new ValidationException(String.format("Forma Pagamento '%s' não encontrada.", value));
        };
    }
}
