package br.com.gnk.cupcakeemporium.repositories;

import br.com.gnk.cupcakeemporium.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
