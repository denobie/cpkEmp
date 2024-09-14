package br.com.gnk.cupcakeemporium.resources;

import br.com.gnk.cupcakeemporium.dto.UsuarioDTO;
import br.com.gnk.cupcakeemporium.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuario")
@RequiredArgsConstructor
public class UsuarioResource {
    private final UsuarioService usuarioService;

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(this.usuarioService.findById(id));
    }

    @GetMapping("/login/{login}")
    public ResponseEntity<UsuarioDTO> findByLogin(@PathVariable String login){
        return ResponseEntity.ok(this.usuarioService.findByLogin(login));
    }
}
