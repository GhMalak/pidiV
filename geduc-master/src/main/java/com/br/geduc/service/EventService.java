package com.br.geduc.service;

import com.br.geduc.document.EventDocument;
import com.br.geduc.dto.enums.EventStatusEnum;
import com.br.geduc.dto.request.EventRequestDTO;
import com.br.geduc.dto.request.SubscribeEventDTO;
import com.br.geduc.dto.response.EventResponseDTO;
import com.br.geduc.exceptions.BusinessException;
import com.br.geduc.mapper.EventMapper;
import com.br.geduc.mapper.SubscribeMapper;
import com.br.geduc.repository.EventRepository;
import com.br.geduc.repository.SubscriberRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.br.geduc.constants.Errors.*;
import static com.br.geduc.dto.enums.EventStatusEnum.PENDING;
import static com.br.geduc.dto.enums.NotificationTypeEnum.*;

@AllArgsConstructor
@Slf4j
public class EventService {

    private EventRepository eventRepository;

    private EventMapper eventMapper;

    private StorageService storageService;

    private UserService userService;

    private NotificationService notificationService;

    private SubscriberRepository subscriberRepository;

    private SubscribeMapper subscribeMapper;

    public EventResponseDTO createEvent(EventRequestDTO event) {
        event.setStatus(PENDING);
        storageService.findEventFiles(event.getFilesId());
        var enventDocument = eventMapper.toDocument(event);
        var document = eventRepository.save(enventDocument);
        notificationService.createNotification(event.getCreatorRegistration(), event.getTitle(), CREATE_EVENT);
        return eventMapper.toResponse(document);
    }

    public void cancelEvent(String eventNumber) {
        var event = getEventByEventNumber(eventNumber);

        if (event.isEmpty())
            throw new BusinessException(EVENT_NOT_EXISTS);

        event.get().setStatus(EventStatusEnum.CANCELLED);
        this.eventRepository.save(event.get());

        var subscibers = this.subscriberRepository.findAllSubscibersByEventNumber(eventNumber);

        if (!subscibers.isEmpty()) {
            subscibers.forEach(sub -> {
                this.notificationService.createNotification(sub.getRegistration(), event.get().getTitle(), CANCEL_EVENT);
                this.subscriberRepository.delete(sub);
            });
        }
    }

    public void subscribeEvent(SubscribeEventDTO subscriber) {
        var event = getEventByEventNumber(subscriber.getEventNumber());
        var user = userService.getUserByRegistration(subscriber.getRegistration());

        if (event.isEmpty()) {
            throw new BusinessException(EVENT_NOT_EXISTS);
        }

        if (Objects.isNull(user)) {
            throw new BusinessException(USER_NOT_EXIST);
        }

        if (Objects.equals(event.get().getStatus(), EventStatusEnum.CANCELLED))
            throw new BusinessException(EVENT_CANCELLED);

        userService.validateIfUserAlreadySubscribeInEvent(subscriber.getEventNumber(), subscriber.getRegistration());

        subscriberRepository.save(subscribeMapper.toDocument(subscriber));

        notificationService.createNotification(user.getRegistration(), event.get().getTitle(), SUBSCRIBE_EVENT);
    }

    public void unsubscribeEvent(String eventNumber, String registration) {
        var event = getEventByEventNumber(eventNumber);
        var user = userService.getUserByRegistration(registration);

        if (event.isEmpty()) {
            throw new BusinessException(EVENT_NOT_EXISTS);
        }

        if (Objects.isNull(user)) {
            throw new BusinessException(USER_NOT_EXIST);
        }

        var document = subscriberRepository.findByEventNumberAndRegistration(eventNumber, registration);

        subscriberRepository.delete(document);
        notificationService.createNotification(registration, event.get().getTitle(), UNSUBSCRIBE_EVENT);
    }

    public List<EventResponseDTO> listEventsSubscribed(String registration, String eventNumber) {
        var documentList = this.subscriberRepository.findSubscriber(registration, eventNumber);
        var events = new ArrayList<EventResponseDTO>();

        documentList.forEach(subscribe -> {
            var event = getEventByEventNumber(subscribe.getEventNumber());
            event.ifPresent(eventDocument -> events.add(eventMapper.toResponse(eventDocument)));
        });

        return events;
    }

    public EventResponseDTO updateEvent(String eventNumber, EventRequestDTO event) {
        var eventDocument = getEventByEventNumber(eventNumber);

        if (eventDocument.isEmpty())
            throw new BusinessException(EVENT_NOT_EXISTS);

        event.setEventNumber(eventNumber);
        event.setStatus(eventDocument.get().getStatus());
        var updatedEvent = eventMapper.toDocument(event);
        eventRepository.save(updatedEvent);

        return eventMapper.toResponse(updatedEvent);
    }

    public List<EventResponseDTO> listEvents(String eventNumber, String creatorRegistration, String status, String title, List<String> techs) {
        var responseList = new ArrayList<EventResponseDTO>();
        var events = eventRepository.findEvents(eventNumber, creatorRegistration, status, title, techs);
        events.forEach(event -> {
            var eventMapper = this.eventMapper.toResponse(event);
            if (Objects.nonNull(event.getThumbId()))
                eventMapper.setThumbnail(storageService.getFile(event.getThumbId()));
            responseList.add(eventMapper);
        });

        return responseList;
    }

    public Optional<EventDocument> getEventByEventNumber(String eventNumber) {
        return eventRepository.findById(eventNumber);
    }
}
