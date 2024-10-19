package br.com.gnk.cupcakeemporium.services;

import br.com.gnk.cupcakeemporium.dto.ClienteDTO;
import br.com.gnk.cupcakeemporium.entities.Cliente;
import br.com.gnk.cupcakeemporium.exceptions.RestException;
import br.com.gnk.cupcakeemporium.exceptions.ValidationException;
import br.com.gnk.cupcakeemporium.repositories.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

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
        Cliente clienteSaved = this.clienteRepository.save(ClienteDTO.toEntity(clienteRequestDTO));

        return ClienteDTO.fromEntity(clienteSaved);
    }

    public ClienteDTO update(Long idUpdate, ClienteDTO clienteRequestDTO){
        if (!idUpdate.equals(clienteRequestDTO.getId())){
            throw new ValidationException(String.format("Id da seção '%d' diferente do id do Request '%d'", idUpdate, clienteRequestDTO.getId()));
        }

        Cliente clienteSaved = this.clienteRepository.save(prepareToMerge(ClienteDTO.toEntity(clienteRequestDTO)));

        return ClienteDTO.fromEntity(clienteSaved);
    }

    private Cliente prepareToMerge(Cliente clienteToSave){
        Cliente clienteFound = foundCliente(clienteToSave.getId());

        return clienteFound.merge(clienteToSave);
    }

    private Cliente foundCliente(Long id){
        return this.clienteRepository.findById(id)
                .orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, String.format("Cliente '%d' não encontrado.", id)));
    }
}
