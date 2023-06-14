package com.br.geduc.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.util.Set;

import static com.br.geduc.constants.Errors.TAGS_IS_REQUIRED;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequestDTO {

    @NotEmpty(message = TAGS_IS_REQUIRED)
    private Set<String> techs;

}
