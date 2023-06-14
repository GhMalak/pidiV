package com.br.geduc.dto.response;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CertificateResponseDTO {
    private String eventNumber;
    private String registration;
    private String eventTitle;
}
