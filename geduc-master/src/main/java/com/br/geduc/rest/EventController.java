package com.br.geduc.rest;

import com.br.geduc.dto.request.EventRequestDTO;
import com.br.geduc.dto.request.SubscribeEventDTO;
import com.br.geduc.dto.response.EventResponseDTO;
import com.br.geduc.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/event")
@Validated
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    @ResponseStatus(CREATED)
    public EventResponseDTO createEvent(@Valid @RequestBody EventRequestDTO event) {
        return eventService.createEvent(event);
    }

    @GetMapping
    @ResponseStatus(OK)
    public List<EventResponseDTO> listEvents(
            @RequestParam(required = false) String eventNumber,
            @RequestParam(required = false) String creatorRegistration,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) List<String> techs) {
        return eventService.listEvents(eventNumber, creatorRegistration, status, title, techs);
    }

    @PutMapping(value = "/{eventNumber}")
    @ResponseStatus(OK)
    public EventResponseDTO update(@Valid @RequestBody EventRequestDTO event, @PathVariable String eventNumber) {
        return eventService.updateEvent(eventNumber, event);
    }

    @PostMapping(value = "/subscribe")
    @ResponseStatus(CREATED)
    public void subscribeEvent(@Valid @RequestBody SubscribeEventDTO subscriber) {
        eventService.subscribeEvent(subscriber);
    }

    @PostMapping(value = "/cancel/{eventNumber}")
    @ResponseStatus(CREATED)
    public void cancelEvent(@PathVariable("eventNumber") String eventNumber) {
        eventService.cancelEvent(eventNumber);
    }

    @PostMapping(value = "/unsubscribe/{eventNumber}/{registration}")
    @ResponseStatus(CREATED)
    public void unsubscribeEvent(@PathVariable("eventNumber") String eventNumber, @PathVariable("registration") String registration) {
        eventService.unsubscribeEvent(eventNumber, registration);
    }

    @GetMapping(value = "/subscribed/{registration}")
    @ResponseStatus(OK)
    public List<EventResponseDTO> listEventsSubscribed(@PathVariable("registration") String registration, @RequestParam(required = false) String eventNumber) {
        return eventService.listEventsSubscribed(registration, eventNumber);
    }
}
