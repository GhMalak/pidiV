package com.br.geduc.exceptions.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Builder
@Data
public class ExceptionResponse {
    private Integer status;
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();
    private String message;
    private List<ExceptionFieldError> fields;

    public void addError(String fieldName, String message) {
        if (Objects.isNull(fields))
            fields = new ArrayList<>();

        fields.add(ExceptionFieldError.builder()
                .field(fieldName)
                .error(message)
                .build());
    }
}
