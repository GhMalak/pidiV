package com.br.geduc.configuration;

import com.br.geduc.mapper.EventMapper;
import com.br.geduc.mapper.NotificationMapper;
import com.br.geduc.mapper.SubscribeMapper;
import com.br.geduc.mapper.UserMapper;
import com.br.geduc.repository.EventRepository;
import com.br.geduc.repository.NotificationRepository;
import com.br.geduc.repository.SubscriberRepository;
import com.br.geduc.repository.UserRepository;
import com.br.geduc.service.EventService;
import com.br.geduc.service.NotificationService;
import com.br.geduc.service.StorageService;
import com.br.geduc.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {

    @Bean
    public UserService userService(UserRepository userRepository, StorageService storageService, SubscriberRepository subscriberRepository) {
        return new UserService(
                userRepository,
                new UserMapper(new ModelMapper()),
                storageService,
                subscriberRepository
        );
    }

    @Bean
    public EventService eventService(EventRepository eventRepository, StorageService storageService, UserService userService, NotificationService notificationService, SubscriberRepository subscriberRepository) {
        return new EventService(
                eventRepository,
                new EventMapper(new ModelMapper()),
                storageService,
                userService,
                notificationService,
                subscriberRepository,
                new SubscribeMapper(new ModelMapper())
                );
    }

    @Bean
    public NotificationService notificationService(NotificationRepository notificationRepository) {
        return new NotificationService(
                notificationRepository,
                new NotificationMapper(new ModelMapper())
        );
    }

    @Bean
    public ModelMapper modelMapper() { return new ModelMapper(); }

}
