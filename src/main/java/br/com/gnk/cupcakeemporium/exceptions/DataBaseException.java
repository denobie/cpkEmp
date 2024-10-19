package br.com.gnk.cupcakeemporium.exceptions;

public class DataBaseException extends RuntimeException{
    public DataBaseException(String exceptionMessage){
        super(exceptionMessage);
    }
}
