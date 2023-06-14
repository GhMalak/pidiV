package com.br.geduc.mapper;

import com.br.geduc.document.SubscribeDocument;
import com.br.geduc.dto.request.SubscribeEventDTO;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;

public class SubscribeMapper {

    private final ModelMapper mapper;

    public SubscribeMapper(ModelMapper mapper) {
        this.mapper = mapper;
        this.mapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
    }

    public SubscribeDocument toDocument(SubscribeEventDTO subscribeDTO) {
        return mapper.map(subscribeDTO, SubscribeDocument.class);
    }
}
