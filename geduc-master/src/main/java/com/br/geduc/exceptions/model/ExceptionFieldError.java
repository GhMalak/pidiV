package com.br.geduc.exceptions.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class ExceptionFieldError {
    private String field;
    private String error;
}
