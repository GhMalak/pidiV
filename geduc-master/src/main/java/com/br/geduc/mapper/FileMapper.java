package com.br.geduc.mapper;

import com.br.geduc.document.FileDocument;
import com.br.geduc.dto.response.FileResponseDTO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FileMapper {

    public static FileResponseDTO toResponse(FileDocument document) {
        return FileResponseDTO.builder()
                .id(document.getAzureId())
                .name(document.getOriginalName())
                .contentType(document.getContentType())
                .build();
    }

}
