package com.br.geduc.service;

import com.br.geduc.document.CertificateDocument;
import com.br.geduc.dto.enums.NotificationTypeEnum;
import com.br.geduc.dto.response.CertificateResponseDTO;
import com.br.geduc.exceptions.BusinessException;
import com.br.geduc.repository.CertificateRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.br.geduc.constants.Errors.*;

@Service
@AllArgsConstructor
@Slf4j
public class CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificationService notificationService;

    public void generateCertificate(String eventNumber, String registration) {
        var event = this.eventService.getEventByEventNumber(eventNumber);
        var user = this.userService.getUserByRegistration(registration);

        if (event.isEmpty())
            throw new BusinessException(EVENT_NOT_EXISTS);

        if (Objects.isNull(user))
            throw new BusinessException(USER_NOT_EXIST);

        if (event.get().getCreatorRegistration().equals(registration))
            throw new BusinessException(EVENT_OWNER_CANT_GENERATE_CERTIFICATE);

        var certificate = this.certificateRepository.findByRegistrationAndEventNumber(registration, eventNumber);

        if (Objects.nonNull(certificate))
            throw new BusinessException(CERTIFICATE_ALREADY_DONE);

        var document = CertificateDocument.builder()
                .eventNumber(eventNumber)
                .registration(registration)
                .build();

        this.certificateRepository.save(document);
        this.notificationService.createNotification(registration, event.get().getTitle(), NotificationTypeEnum.FINISH_EVENT);
    }

    public List<CertificateResponseDTO> listCertificates(String registration) {
        var user = this.userService.getUserByRegistration(registration);

        if (Objects.isNull(user))
            throw new BusinessException(USER_NOT_EXIST);

        var document = this.certificateRepository.findByRegistration(registration);

        var listToReturn = new ArrayList<CertificateResponseDTO>();

        document.forEach(certificate -> {
            var event = this.eventService.getEventByEventNumber(certificate.getEventNumber());

            var dto = CertificateResponseDTO.builder()
                    .eventNumber(certificate.getEventNumber())
                    .registration(certificate.getRegistration())
                    .eventTitle(event.get().getTitle())
                    .build();

            listToReturn.add(dto);
        });

        return listToReturn;
    }
}
