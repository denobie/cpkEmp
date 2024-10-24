package br.com.gnk.cupcakeemporium.enumerable.converter;

import br.com.gnk.cupcakeemporium.enumerable.SituacaoPedido;
import jakarta.persistence.AttributeConverter;

import java.util.Objects;

public class SituacaoPedidoEnumConverter implements AttributeConverter<SituacaoPedido, String> {

    @Override
    public String convertToDatabaseColumn(SituacaoPedido attribute) {
        if (Objects.isNull(attribute)) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public SituacaoPedido convertToEntityAttribute(String dbData) {
        return SituacaoPedido.fromValue(dbData);
    }
}
