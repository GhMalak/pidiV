package com.br.geduc.mapper;

import com.br.geduc.document.NotificationDocument;
import com.br.geduc.dto.response.NotificationResponseDTO;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;

public class NotificationMapper {

    private final ModelMapper mapper;

    public NotificationMapper(ModelMapper mapper) {
        this.mapper = mapper;
        this.mapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
    }

    public NotificationResponseDTO toResponse(NotificationDocument notificationDocument) {
        return mapper.map(notificationDocument, NotificationResponseDTO.class);
    }

}
