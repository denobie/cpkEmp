package br.com.gnk.cupcakeemporium.enumerable.converter;

import br.com.gnk.cupcakeemporium.enumerable.FormaPagamento;
import br.com.gnk.cupcakeemporium.enumerable.SituacaoPedido;
import jakarta.persistence.AttributeConverter;

import java.util.Objects;

public class FormaPagamentoEnumConverter implements AttributeConverter<FormaPagamento, String> {

    @Override
    public String convertToDatabaseColumn(FormaPagamento attribute) {
        if (Objects.isNull(attribute)) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public FormaPagamento convertToEntityAttribute(String dbData) {
        return FormaPagamento.fromValue(dbData);
    }
}
