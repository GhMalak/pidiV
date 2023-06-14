package com.br.geduc.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "notifications")
public class NotificationDocument {

    @Id
    private String id;

    @Field("registration")
    private String registration;

    @Field("notification")
    private String notification;

    @Field("status")
    private String status;

    @Field("creationTimeStamp")
    private String creationTimeStamp;

}
