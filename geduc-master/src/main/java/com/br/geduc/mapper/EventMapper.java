package com.br.geduc.mapper;

import com.br.geduc.document.EventDocument;
import com.br.geduc.dto.request.EventRequestDTO;
import com.br.geduc.dto.response.EventResponseDTO;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;

public class EventMapper {

    private final ModelMapper mapper;

    public EventMapper(ModelMapper mapper) {
        this.mapper = mapper;
        this.mapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
    }

    public EventDocument toDocument(EventRequestDTO event) {
        return mapper.map(event, EventDocument.class);
    }

    public EventResponseDTO toResponse(EventDocument event) { return mapper.map(event, EventResponseDTO.class); }
}
