package br.com.gnk.cupcakeemporium.entities;

import br.com.gnk.cupcakeemporium.dto.ClienteDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 250)
    @NotNull
    private String nome;

    @Column(length = 250)
    @NotNull
    private String email;

    @NotNull
    private String telefone;

    @Column(length = 500)
    @NotNull
    private String endereco;

    @Column(length = 8)
    @NotNull
    private String cep;

    @Column(length = 20, name = "numeroresidencia")
    @NotNull
    private String numeroResidencia;

    @Column(length = 250)
    @NotNull
    private String complemento;

    @Column(length = 250)
    @NotNull
    private String bairro;

    @Column(length = 250)
    @NotNull
    private String cidade;

    @Column(length = 2)
    @NotNull
    private String uf;

    public Cliente merge(Cliente clienteToMerge){
        this.setNome(clienteToMerge.getNome());
        this.setEmail(clienteToMerge.getEmail());
        this.setTelefone(clienteToMerge.getTelefone());
        this.setEndereco(clienteToMerge.getEndereco());
        this.setCep(clienteToMerge.getCep());
        this.setNumeroResidencia(clienteToMerge.getNumeroResidencia());
        this.setComplemento(clienteToMerge.getComplemento());
        this.setBairro(clienteToMerge.getBairro());
        this.setCidade(clienteToMerge.getCidade());
        this.setUf(clienteToMerge.getUf());

        return this;
    }
}
