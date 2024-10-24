package br.com.gnk.cupcakeemporium.dto;

import br.com.gnk.cupcakeemporium.entities.Cliente;
import lombok.Data;

@Data
public class ClienteDTO {
    private Long id;
    private String nome;
    private String email;
    private String telefone;
    private String endereco;

    public static ClienteDTO fromEntity(Cliente cliente){
        ClienteDTO clienteDTO = new ClienteDTO();
        clienteDTO.setId(cliente.getId());
        clienteDTO.setNome(cliente.getNome());
        clienteDTO.setEmail(cliente.getEmail());
        clienteDTO.setTelefone(cliente.getTelefone());
        clienteDTO.setEndereco(cliente.getEndereco());

        return clienteDTO;
    }

    public Cliente toEntity(){
        Cliente cliente = new Cliente();
        cliente.setId(this.getId());
        cliente.setNome(this.getNome());
        cliente.setEmail(this.getEmail());
        cliente.setTelefone(this.getTelefone());
        cliente.setEndereco(this.getEndereco());

        return cliente;
    }
}
