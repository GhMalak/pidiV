package com.br.geduc.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    @JsonIgnore
    private String id;
    private String registration;
    private String name;
    private String email;
    @JsonIgnore
    private String password;
    @JsonIgnore
    private Boolean isAdmin;
    private Set<String> techs;
    private StorageResponseDTO avatar;
}
