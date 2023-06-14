package com.br.geduc.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "storage")
public class StorageFileDocument {

    @Id
    private String id;

    @Field("creationDate")
    @Builder.Default
    private LocalDateTime createdDate = LocalDateTime.now();

    @Field("uploadDate")
    private LocalDateTime finalUploadDate;

    @Field("archives")
    @Builder.Default
    private List<FileDocument> files = new ArrayList<>();
}
