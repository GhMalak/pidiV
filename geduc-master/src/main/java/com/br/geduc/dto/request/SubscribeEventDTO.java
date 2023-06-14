package com.br.geduc.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;

import static com.br.geduc.constants.Errors.EVENT_NUMER_IS_REQUIRED;
import static com.br.geduc.constants.Errors.REGISTRATION_IS_REQUIRED;

@Data
@Builder
@AllArgsConstructor
public class SubscribeEventDTO {

    @NotBlank(message = EVENT_NUMER_IS_REQUIRED)
    private String eventNumber;

    @NotBlank(message = REGISTRATION_IS_REQUIRED)
    private String registration;
}
