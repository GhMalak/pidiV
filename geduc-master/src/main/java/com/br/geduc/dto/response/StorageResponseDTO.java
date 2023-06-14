package com.br.geduc.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class StorageResponseDTO {

    private String filesId;
    @JsonInclude(NON_NULL)
    private LocalDateTime createdDate;

    @JsonInclude(NON_NULL)
    private LocalDateTime finalUploadDate;

    @JsonInclude(NON_NULL)
    private List<FileResponseDTO> files;
}

