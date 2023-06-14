package com.br.geduc.document;

import com.br.geduc.dto.enums.EventStatusEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "events")
public class EventDocument {

    @Id
    @Field("eventNumber")
    @Builder.Default
    private String eventNumber = UUID.randomUUID().toString();

    @Field("title")
    private String title;

    @Field("description")
    private String description;

    @Field("creatorRegistration")
    private String creatorRegistration;

    @Field("duration")
    private String duration;

    @Field("status")
    private EventStatusEnum status;

    @Field("techs")
    private Set<String> techs;

    @Field("filesId")
    private String filesId;

    @Field("thumbId")
    private String thumbId;
}
