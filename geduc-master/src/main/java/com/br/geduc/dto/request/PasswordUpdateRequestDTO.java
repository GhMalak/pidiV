package com.br.geduc.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.Set;

import static com.br.geduc.constants.Errors.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordUpdateRequestDTO {

    @NotBlank(message = REGISTRATION_IS_REQUIRED)
    private String registration;

    @NotBlank(message = EMAIL_IS_REQUIRED)
    private String email;

    @NotBlank(message = PASSWORD_IS_REQUIRED)
    private String password;

}
