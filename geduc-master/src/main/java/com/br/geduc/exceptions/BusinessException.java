package com.br.geduc.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.UNPROCESSABLE_ENTITY;

@Getter
@AllArgsConstructor
public class BusinessException extends RuntimeException {

    public BusinessException(String error) {
        this.error = error;
        this.status = UNPROCESSABLE_ENTITY;
    }

    private final String error;
    private final HttpStatus status;

}
