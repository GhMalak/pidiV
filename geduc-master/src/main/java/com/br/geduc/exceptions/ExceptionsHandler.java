package com.br.geduc.exceptions;

import com.br.geduc.exceptions.model.ExceptionFieldError;
import com.br.geduc.exceptions.model.ExceptionResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler({BusinessException.class})
    public ResponseEntity<ExceptionResponse> handleBusinessException
            (final BusinessException ex) {
        final var response = ExceptionResponse.builder()
                .message(ex.getError())
                .status(ex.getStatus().value())
                .fields(List.of())
                .build();
        return ResponseEntity.status(ex.getStatus().value()).body(response);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException
            (final MethodArgumentNotValidException ex) {
        ExceptionResponse fields = ExceptionResponse.builder().build();
        ExceptionResponse error = ExceptionResponse
                .builder()
                .timestamp(LocalDateTime.now())
                .status(BAD_REQUEST.value())
                .message(BAD_REQUEST.name())
                .fields(getErrorsFields(ex, fields))
                .build();
        return ResponseEntity.status(error.getStatus()).body(error);
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    public ResponseEntity<ExceptionResponse> handleHttpMessageNotReadableException
            (final HttpMessageNotReadableException ex) {
        final var response = ExceptionResponse.builder()
                .message("Invalid field format")
                .status(BAD_REQUEST.value())
                .fields(List.of())
                .build();
        return ResponseEntity.status(BAD_REQUEST).body(response);
    }

    private List<ExceptionFieldError> getErrorsFields(MethodArgumentNotValidException ex, ExceptionResponse error) {
        for (FieldError f : ex.getBindingResult().getFieldErrors()) {
            error.addError(f.getField(), f.getDefaultMessage());
        }

        return error.getFields();
    }
}
