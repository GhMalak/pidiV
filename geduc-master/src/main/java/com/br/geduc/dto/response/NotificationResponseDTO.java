package com.br.geduc.dto.response;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class NotificationResponseDTO {
    private String id;
    private String registration;
    private String notification;
    private String status;
    private String creationTimeStamp;
}
