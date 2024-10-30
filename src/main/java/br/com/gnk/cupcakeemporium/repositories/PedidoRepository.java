package br.com.gnk.cupcakeemporium.repositories;

import br.com.gnk.cupcakeemporium.entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
