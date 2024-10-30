package br.com.gnk.cupcakeemporium.resources;

import br.com.gnk.cupcakeemporium.dto.PedidoDTO;
import br.com.gnk.cupcakeemporium.dto.PedidoPostDTO;
import br.com.gnk.cupcakeemporium.services.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedido")
@RequiredArgsConstructor
public class PedidoResource {
    private final PedidoService pedidoService;

    @GetMapping("/{id}")
    public ResponseEntity<PedidoDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok(this.pedidoService.findById(id));
    }

    @GetMapping
    public ResponseEntity<Page<PedidoDTO>> findAll(Pageable pageable){
        return ResponseEntity.ok(this.pedidoService.findAll(pageable));
    }

    @PostMapping
    public ResponseEntity<PedidoDTO> insert(@RequestBody @Valid PedidoPostDTO pedidoPostDTO){
        return ResponseEntity.ok(this.pedidoService.insert((pedidoPostDTO)));
    }

    @PostMapping("/faturar/{id}")
    public ResponseEntity<PedidoDTO> faturarPedido(@PathVariable Long id){
        this.pedidoService.faturarPedido(id);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/pagar/{id}")
    public ResponseEntity<PedidoDTO> pagarPedido(@PathVariable Long id){
        this.pedidoService.pagarPedido(id);

        return ResponseEntity.ok().build();
    }
}
