package com.br.geduc.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Set;

import static com.br.geduc.constants.Errors.*;

@Data
@Builder
@AllArgsConstructor
public class UserRequestDTO {

    @NotBlank(message = REGISTRATION_IS_REQUIRED)
    private String registration;

    @NotBlank(message = NAME_IS_REQUIRED)
    private String name;

    @NotBlank(message = EMAIL_IS_REQUIRED)
    private String email;

    @NotBlank(message = PASSWORD_IS_REQUIRED)
    private String password;

    private Set<String> techs;

}
