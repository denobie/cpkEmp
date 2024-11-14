package br.com.gnk.cupcakeemporium.resources;

import br.com.gnk.cupcakeemporium.dto.ClienteDTO;
import br.com.gnk.cupcakeemporium.dto.LoginDTO;
import br.com.gnk.cupcakeemporium.dto.UsuarioDTO;
import br.com.gnk.cupcakeemporium.services.ClienteService;
import br.com.gnk.cupcakeemporium.services.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuario")
@RequiredArgsConstructor
public class UsuarioResource {
    private final UsuarioService usuarioService;
    private final ClienteService clienteService;

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(this.usuarioService.findById(id));
    }

    @PostMapping("/login")
    public ResponseEntity<ClienteDTO> login(@RequestBody LoginDTO loginDTO){
        return ResponseEntity.ok(this.clienteService.login(loginDTO));
    }
}
