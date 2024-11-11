package br.com.gnk.cupcakeemporium.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.time.ZoneId;

@ControllerAdvice
public class GlobalException {
    private static final Logger logger = LoggerFactory.getLogger(GlobalException.class);

    private HttpHeaders generateHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Teste-Java-Exception", "true");
        return httpHeaders;
    }

    @ExceptionHandler(RestException.class)
    public ResponseEntity<StandardError> resourceNotFound(RuntimeException e, HttpServletRequest request){
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .headers(generateHeaders())
                .body(new StandardError(LocalDateTime.now().atZone(ZoneId.of("America/Sao_Paulo")).toInstant(),
                        HttpStatus.NOT_FOUND,
                        e.getMessage(),
                        request.getRequestURI(),
                        ""));
    }

    @ExceptionHandler(DataBaseException.class)
    public ResponseEntity<StandardError> dataBaseException(RuntimeException e, HttpServletRequest request){
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .headers(generateHeaders())
                .body(new StandardError(LocalDateTime.now().atZone(ZoneId.of("America/Sao_Paulo")).toInstant(),
                        HttpStatus.BAD_REQUEST,
                        e.getMessage(),
                        request.getRequestURI(),
                        "DataBaseException"));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<StandardError> constraintViolationException(RuntimeException e, HttpServletRequest request){
        e.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .headers(generateHeaders())
                .body(new StandardError(LocalDateTime.now().atZone(ZoneId.of("America/Sao_Paulo")).toInstant(),
                        HttpStatus.BAD_REQUEST,
                        e.getMessage(),
                        request.getRequestURI(),
                        ""));
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<StandardError> validationException(RuntimeException e, HttpServletRequest request){
        logger.error(e.getStackTrace().toString());
        logger.error("--------------------------------------");
        e.printStackTrace();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .headers(generateHeaders())
                .body(new StandardError(LocalDateTime.now().atZone(ZoneId.of("America/Sao_Paulo")).toInstant(),
                        HttpStatus.BAD_REQUEST,
                        e.getMessage(),
                        request.getRequestURI(),
                        "ValidationException"));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<StandardError> methodArgumentNotValidException(MethodArgumentNotValidException e, HttpServletRequest request){
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .headers(generateHeaders())
                .body(new StandardError(LocalDateTime.now().atZone(ZoneId.of("America/Sao_Paulo")).toInstant(),
                        HttpStatus.BAD_REQUEST,
                        e.getMessage(),
                        request.getRequestURI(),
                        "MethodArgumentNotValidException"));
    }
}

