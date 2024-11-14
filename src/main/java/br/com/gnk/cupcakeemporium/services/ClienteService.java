package br.com.gnk.cupcakeemporium.services;

import br.com.gnk.cupcakeemporium.dto.ClienteDTO;
import br.com.gnk.cupcakeemporium.dto.LoginDTO;
import br.com.gnk.cupcakeemporium.entities.Cliente;
import br.com.gnk.cupcakeemporium.exceptions.DataBaseException;
import br.com.gnk.cupcakeemporium.exceptions.RestException;
import br.com.gnk.cupcakeemporium.exceptions.ValidationException;
import br.com.gnk.cupcakeemporium.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

@Service
@RequiredArgsConstructor
public class ClienteService {
    private final ClienteRepository clienteRepository;

    public ClienteDTO findById(Long id){
        return ClienteDTO.fromEntity(foundCliente(id));
    }

    public Page<ClienteDTO> findAll(Pageable pageable){
        return this.clienteRepository.findAll(pageable).map(ClienteDTO::fromEntity);
    }

    public ClienteDTO insert(ClienteDTO clienteRequestDTO){
        Cliente clienteSaved = this.clienteRepository.save(clienteRequestDTO.toEntity());

        return ClienteDTO.fromEntity(clienteSaved);
    }

    public ClienteDTO update(Long idUpdate, ClienteDTO clienteRequestDTO){
        if (!idUpdate.equals(clienteRequestDTO.getId())){
            throw new ValidationException(String.format("Id da seção '%d' diferente do id do Request '%d'", idUpdate, clienteRequestDTO.getId()));
        }

        Cliente clienteSaved = this.clienteRepository.save(prepareToMerge(clienteRequestDTO.toEntity()));

        return ClienteDTO.fromEntity(clienteSaved);
    }

    public void delete(Long idDelete){
        try {
            this.clienteRepository.deleteById(foundCliente(idDelete).getId());
        }
        catch (DataIntegrityViolationException e){
            throw new DataBaseException(e.getMessage());
        }
    }

    private Cliente prepareToMerge(Cliente clienteToSave){
        Cliente clienteFound = foundCliente(clienteToSave.getId());

        return clienteFound.merge(clienteToSave);
    }

    private Cliente foundCliente(Long id){
        return this.clienteRepository.findById(id)
                .orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, String.format("Cliente '%d' não encontrado.", id)));
    }

    public ClienteDTO login(LoginDTO loginDTO) {
        if (ObjectUtils.isEmpty(loginDTO.getEmail().isBlank()) || ObjectUtils.isEmpty(loginDTO.getSenha())) {
            throw new RestException(HttpStatus.NOT_FOUND, "Usuário ou Senha inválidos");
        }

        return ClienteDTO.fromEntity(this.clienteRepository.findByEmailIgnoreCaseAndSenhaIgnoreCase(loginDTO.getEmail(), loginDTO.getSenha())
                .orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, "Usuário ou Senha inválidos")));
    }
}
