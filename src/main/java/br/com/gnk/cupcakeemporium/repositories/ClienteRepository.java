package br.com.gnk.cupcakeemporium.repositories;

import br.com.gnk.cupcakeemporium.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
}
