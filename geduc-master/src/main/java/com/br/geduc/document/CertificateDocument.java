package com.br.geduc.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "certificates")
public class CertificateDocument {

    @Id
    private String id;

    @Field("eventNumber")
    private String eventNumber;

    @Field("registration")
    private String registration;
}
