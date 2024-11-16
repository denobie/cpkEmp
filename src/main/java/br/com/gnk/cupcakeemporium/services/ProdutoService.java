package br.com.gnk.cupcakeemporium.services;

import br.com.gnk.cupcakeemporium.dto.ProdutoDTO;
import br.com.gnk.cupcakeemporium.entities.Produto;
import br.com.gnk.cupcakeemporium.exceptions.DataBaseException;
import br.com.gnk.cupcakeemporium.exceptions.RestException;
import br.com.gnk.cupcakeemporium.exceptions.ValidationException;
import br.com.gnk.cupcakeemporium.repositories.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    public ProdutoDTO findById(Long id){
        return ProdutoDTO.fromEntity(foundProduto(id));
    }

    public Page<ProdutoDTO> findAll(Pageable pageable){
        return this.produtoRepository.findAll(pageable).map(ProdutoDTO::fromEntity);
    }

    public Page<ProdutoDTO> search(Pageable pageable, String descricao){
        return this.produtoRepository.findByDescricaoIgnoreCaseContaining(pageable, descricao).map(ProdutoDTO::fromEntity);
    }

    public ProdutoDTO insert(ProdutoDTO produtoRequestDTO){
        Produto produtoSaved = this.produtoRepository.save(produtoRequestDTO.toEntity());

        return ProdutoDTO.fromEntity(produtoSaved);
    }

    public ProdutoDTO update(Long idUpdate, ProdutoDTO produtoRequestDTO){
        if (!produtoRequestDTO.getId().equals(idUpdate)){
            throw new ValidationException(String.format("Id da seção '%d' diferente do id do Request '%d'", idUpdate, produtoRequestDTO.getId()));
        }

        Produto produtoSaved = this.produtoRepository.save(prepareToMerge(produtoRequestDTO.toEntity()));

        return ProdutoDTO.fromEntity(produtoSaved);
    }

    public void delete(Long id){
        try {
            this.produtoRepository.deleteById(foundProduto(id).getId());
        }
        catch (DataIntegrityViolationException e){
            throw new DataBaseException(e.getMessage());
        }
    }

    private Produto prepareToMerge(Produto produtoToSave){
        Produto produtoFound = foundProduto(produtoToSave.getId());

        return produtoFound.merge(produtoToSave);
    }

    private Produto foundProduto(Long id){
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RestException(HttpStatus.NOT_FOUND, String.format("Produto '%d' não encontrado.", id)));
    }

}
