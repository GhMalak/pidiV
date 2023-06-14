package com.br.geduc.document;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class UserDocument {

    @Id
    private String id;

    @Field("registration")
    private String registration;

    @Field("name")
    private String name;

    @Field("email")
    private String email;

    @Field("password")
    private String password;

    @Field("isAdmin")
    private Boolean isAdmin;

    @Field("techs")
    private Set<String> techs;

    @Field("avatarId")
    private String avatarId;
}
