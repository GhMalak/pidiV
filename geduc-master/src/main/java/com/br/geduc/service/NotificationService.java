package com.br.geduc.service;

import com.br.geduc.document.NotificationDocument;
import com.br.geduc.dto.enums.NotificationTypeEnum;
import com.br.geduc.dto.response.NotificationResponseDTO;
import com.br.geduc.mapper.NotificationMapper;
import com.br.geduc.repository.NotificationRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class NotificationService {

    //private static final DateTimeFormatter DATE_TIME_PATTERN = DateTimeFormatter.ofPattern("yyyy-MM-ddTHH:mm:ss");

    private NotificationRepository notificationRepository;

    private NotificationMapper notificationMapper;

    public void createNotification(String registration, String eventTitle, NotificationTypeEnum notificationType) {
        var document = NotificationDocument.builder()
                .registration(registration)
                .notification(getNotification(eventTitle, notificationType))
                .creationTimeStamp(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'")))
                .status("PENDING")
                .build();
        this.notificationRepository.save(document);
    }

    public void readNotification(String notificationId) {
        var document = this.notificationRepository.findById(notificationId).get();

        var documentUpdate = NotificationDocument.builder()
                .id(document.getId())
                .registration(document.getRegistration())
                .notification(document.getNotification())
                .creationTimeStamp(document.getCreationTimeStamp())
                .status("READ")
                .build();

        this.notificationRepository.save(documentUpdate);
    }

    public List<NotificationResponseDTO> listNotifications(String registration) {
        var listToReturn = new ArrayList<NotificationResponseDTO>();
        this.notificationRepository.findByRegistrationNotReaded(registration).forEach(document -> {
            listToReturn.add(notificationMapper.toResponse(document));
        });
        listToReturn.sort(Comparator.comparing(e -> LocalDateTime.parse(e.getCreationTimeStamp(), DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"))));
        return listToReturn;
    }

    private String getNotification(String eventTitle, NotificationTypeEnum notificationType) {
        switch (notificationType) {
            case SUBSCRIBE_EVENT:
                return "Você se inscreveu no evento " + eventTitle;
            case CREATE_EVENT:
                return "Você criou o evento " + eventTitle;
            case FINISH_EVENT:
                return "Você encerrou o evento " + eventTitle + ", logo seu certificado estará disponível.";
            case CANCEL_EVENT:
                return "O evento " + eventTitle + " foi cancelado.";
            case UNSUBSCRIBE_EVENT:
                return "Você cancelou a inscrição no evento " + eventTitle + ".";
            default:
                return null;
        }
    }

}
