package com.br.geduc.dto.request;

import com.br.geduc.dto.enums.EventStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.util.Set;

import static com.br.geduc.constants.Errors.*;

@Data
@Builder
@AllArgsConstructor
public class EventRequestDTO {

    @Null(message = EVENT_NUMER_IS_NON_REQUIRED)
    private String eventNumber;

    @NotBlank(message = TITLE_IS_REQUIRED)
    private String title;

    @NotBlank(message = DESCRIPTION_IS_REQUIRED)
    private String description;

    @NotBlank(message = REGISTRATION_IS_REQUIRED)
    private String creatorRegistration;

    @NotBlank(message = DURATION_IS_REQUIRED)
    private String duration;

    @Null(message = EVENT_STATUS_IS_NON_REQUIRED)
    private EventStatusEnum status;

    private Set<String> techs;

    @NotBlank(message = FILE_ID_IS_REQUIRED)
    private String filesId;

}
