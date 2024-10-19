package br.com.gnk.cupcakeemporium.services;

import br.com.gnk.cupcakeemporium.dto.UsuarioDTO;
import br.com.gnk.cupcakeemporium.entities.Usuario;
import br.com.gnk.cupcakeemporium.exceptions.RestException;
import br.com.gnk.cupcakeemporium.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioDTO findById(Long id){
        return UsuarioDTO.fromEntity(foundUsuario(id));
    }

    private Usuario foundUsuario(Long id){
        return this.usuarioRepository.findById(id)
                .orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, String.format(String.format("Usuário '%d' não encontrado", id))));
    }

    private Usuario foundLogin(String login){
        return this.usuarioRepository.findByLogin(login)
                .orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, String.format(String.format("Login '%s' não encontrado", login))));
    }

    public UsuarioDTO findByLogin(String login) {
        return UsuarioDTO.fromEntity(foundLogin(login));
    }
}
