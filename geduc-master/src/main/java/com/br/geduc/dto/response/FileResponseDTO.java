package com.br.geduc.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FileResponseDTO {

    private String id;
    private String name;
    private String contentType;
    private byte[] bytes;
}
