package br.com.gnk.cupcakeemporium.resources;

import br.com.gnk.cupcakeemporium.dto.ClienteDTO;
import br.com.gnk.cupcakeemporium.services.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cliente")
@RequiredArgsConstructor
public class ClienteResource {
    private final ClienteService clienteService;

    public ResponseEntity<Page<ClienteDTO>> findAll(Pageable pageable){
        return ResponseEntity.ok(this.clienteService.findAll(pageable));
    }
}
