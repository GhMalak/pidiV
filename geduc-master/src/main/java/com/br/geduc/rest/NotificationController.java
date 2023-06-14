package com.br.geduc.rest;

import com.br.geduc.dto.response.NotificationResponseDTO;
import com.br.geduc.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/notification")
@Validated
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{registration}")
    @ResponseStatus(OK)
    public List<NotificationResponseDTO> listNotifications(
            @PathVariable("registration") String registration) {
        return notificationService.listNotifications(registration);
    }

    @PostMapping("/read/{notificationId}")
    @ResponseStatus(OK)
    public void readNotification(
            @PathVariable("notificationId") String notificationId) {
        notificationService.readNotification(notificationId);
    }

}
