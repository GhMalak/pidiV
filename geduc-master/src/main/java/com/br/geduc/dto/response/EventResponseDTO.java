package com.br.geduc.dto.response;

import com.br.geduc.dto.enums.EventStatusEnum;
import lombok.*;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EventResponseDTO {
    private String eventNumber;
    private String title;
    private String description;
    private String creatorRegistration;
    private String duration;
    private EventStatusEnum status;
    private String filesId;
    private Set<String> techs;
    private StorageResponseDTO thumbnail;
}
