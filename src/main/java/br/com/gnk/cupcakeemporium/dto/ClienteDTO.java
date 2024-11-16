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
    private String cep;
    private String numeroResidencia;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;
    private String admin;
    private String senha;

    public static ClienteDTO fromEntity(Cliente cliente){
        ClienteDTO clienteDTO = new ClienteDTO();
        clienteDTO.setId(cliente.getId());
        clienteDTO.setNome(cliente.getNome());
        clienteDTO.setEmail(cliente.getEmail());
        clienteDTO.setTelefone(cliente.getTelefone());
        clienteDTO.setEndereco(cliente.getEndereco());
        clienteDTO.setCep(cliente.getCep());
        clienteDTO.setNumeroResidencia(cliente.getNumeroResidencia());
        clienteDTO.setComplemento(cliente.getComplemento());
        clienteDTO.setBairro(cliente.getBairro());
        clienteDTO.setCidade(cliente.getCidade());
        clienteDTO.setUf(cliente.getUf());
        clienteDTO.setAdmin(cliente.getAdmin());
        clienteDTO.setSenha(cliente.getSenha());

        return clienteDTO;
    }

    public Cliente toEntity(){
        Cliente cliente = new Cliente();
        cliente.setId(this.getId());
        cliente.setNome(this.getNome());
        cliente.setEmail(this.getEmail());
        cliente.setTelefone(this.getTelefone());
        cliente.setEndereco(this.getEndereco());
        cliente.setCep(this.getCep());
        cliente.setNumeroResidencia(this.getNumeroResidencia());
        cliente.setComplemento(this.getComplemento());
        cliente.setBairro(this.getBairro());
        cliente.setCidade(this.getCidade());
        cliente.setUf(this.getUf());
        cliente.setAdmin(this.getAdmin());
        cliente.setSenha(this.getSenha());

        return cliente;
    }
}
