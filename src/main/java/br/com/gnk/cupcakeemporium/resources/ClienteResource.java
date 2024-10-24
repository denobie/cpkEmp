package br.com.gnk.cupcakeemporium.resources;

import br.com.gnk.cupcakeemporium.dto.ClienteDTO;
import br.com.gnk.cupcakeemporium.services.ClienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cliente")
@RequiredArgsConstructor
public class ClienteResource {
    private final ClienteService clienteService;

    @GetMapping
    public ResponseEntity<Page<ClienteDTO>> findAll(Pageable pageable){
        return ResponseEntity.ok(this.clienteService.findAll(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(this.clienteService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ClienteDTO> insert(@RequestBody @Valid ClienteDTO clienteDTO){
        return ResponseEntity.ok(this.clienteService.insert(clienteDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteDTO> update(@PathVariable Long id, @RequestBody @Valid ClienteDTO clienteDTO){
        return ResponseEntity.ok(this.clienteService.update(id, clienteDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        this.clienteService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
