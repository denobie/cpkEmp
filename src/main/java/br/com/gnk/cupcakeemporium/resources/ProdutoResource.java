package br.com.gnk.cupcakeemporium.resources;

import br.com.gnk.cupcakeemporium.dto.ProdutoDTO;
import br.com.gnk.cupcakeemporium.services.ProdutoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/produto")
@RequiredArgsConstructor
public class ProdutoResource {
    private final ProdutoService produtoService;

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(this.produtoService.findById(id));
    }

    @GetMapping
    public ResponseEntity<Page<ProdutoDTO>> findAll(Pageable pageable){
        return ResponseEntity.ok(this.produtoService.findAll(pageable));
    }

    @GetMapping("/search/{descricao}")
    public ResponseEntity<Page<ProdutoDTO>> search(Pageable pageable, @PathVariable String descricao){
        return ResponseEntity.ok(this.produtoService.search(pageable, descricao));
    }

    @PostMapping
    public ResponseEntity<ProdutoDTO> insert(@RequestBody @Valid ProdutoDTO produtoRequestDTO){
        return ResponseEntity.created(URI.create("")).body(this.produtoService.insert(produtoRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        this.produtoService.delete(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoDTO> update(@PathVariable Long id, @RequestBody ProdutoDTO produtoRequestDTO){
        return ResponseEntity.ok(this.produtoService.update(id, produtoRequestDTO));
    }

}
