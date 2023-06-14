package com.br.geduc.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Builder
@AllArgsConstructor
public class FileDocument {

    @Field("azureId")
    private String azureId;

    @Field("originalName")
    private String originalName;

    @Field("type")
    private String contentType;
}
