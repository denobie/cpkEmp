package br.com.gnk.cupcakeemporium.repositories;

import br.com.gnk.cupcakeemporium.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByEmailIgnoreCaseAndSenhaIgnoreCase(String email, String senha);
}
