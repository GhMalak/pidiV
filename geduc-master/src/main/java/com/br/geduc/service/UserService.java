package com.br.geduc.service;

import com.br.geduc.document.UserDocument;
import com.br.geduc.dto.request.PasswordUpdateRequestDTO;
import com.br.geduc.dto.request.UserAuthRequestDTO;
import com.br.geduc.dto.request.UserRequestDTO;
import com.br.geduc.dto.request.UserUpdateRequestDTO;
import com.br.geduc.dto.response.StorageResponseDTO;
import com.br.geduc.dto.response.UserResponseDTO;
import com.br.geduc.exceptions.BusinessException;
import com.br.geduc.mapper.UserMapper;
import com.br.geduc.repository.SubscriberRepository;
import com.br.geduc.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Objects;

import static com.br.geduc.constants.Errors.*;

@AllArgsConstructor
@Slf4j
public class UserService {

    private UserRepository userRepository;

    private UserMapper userMapper;

    private StorageService storageService;

    private SubscriberRepository subscriberRepository;

    public void createUser(UserRequestDTO user) {
        var userByRegistration = getUserByRegistration(user.getRegistration());
        if (!Objects.isNull(userByRegistration))
            throw new BusinessException(USER_ALREADY_EXIST);

        var userByEmail = getUserByEmail(user.getEmail());
        if (!Objects.isNull(userByEmail))
            throw new BusinessException(USER_ALREADY_EXIST);

        var userDocument = userMapper.toDocument(user);
        userDocument.setIsAdmin(false);
        userRepository.save(userDocument);
    }

    public UserResponseDTO authUser(UserAuthRequestDTO userRequest) {
        var user = this.userRepository.findByRegistration(userRequest.getRegistration());

        if (user.isEmpty())
            throw new BusinessException(USER_NOT_EXIST);

        if (!user.get().getPassword().equals(userRequest.getPassword()))
            throw new BusinessException(INVALID_PASSWORD);

        var userDTO = this.userMapper.toResponse(user.get());

        if (Objects.nonNull(user.get().getAvatarId()))
            userDTO.setAvatar(storageService.getFile(user.get().getAvatarId()));

        return userDTO;
    }

    public UserResponseDTO getUserByRegistration(String registration) {
        var user = userRepository.findByRegistration(registration);
        return user.map(userDocument -> userMapper.toResponse(userDocument)).orElse(null);
    }

    public void changePassword(PasswordUpdateRequestDTO user) {
        var getUser = this.userRepository.findByRegistrationAndEmail(user.getRegistration(), user.getEmail());

        if (getUser.isEmpty())
            throw new BusinessException(USER_NOT_EXIST);

        var document = UserDocument.builder()
                .id(getUser.get().getId())
                .registration(getUser.get().getRegistration())
                .name(getUser.get().getName())
                .email(getUser.get().getEmail())
                .password(user.getPassword())
                .isAdmin(getUser.get().getIsAdmin())
                .techs(getUser.get().getTechs())
                .avatarId(Objects.nonNull(getUser.get().getAvatarId()) ? getUser.get().getAvatarId() : null)
                .build();

        this.userRepository.save(document);
    }

    protected void validateIfUserAlreadySubscribeInEvent(String eventNumber, String registration) {
        var document = subscriberRepository.findByEventNumberAndRegistration(eventNumber, registration);

        if (Objects.nonNull(document))
            throw new BusinessException(USER_ALREADY_SUBSCRIBE);
    }

    public UserResponseDTO updateUser(String registration, UserUpdateRequestDTO request) {
        var oldUser = getUserByRegistration(registration);

        if (Objects.isNull(oldUser))
            throw new BusinessException(USER_NOT_EXIST);

        var userDocument = UserDocument.builder()
                .id(oldUser.getId())
                .registration(oldUser.getRegistration())
                .name(oldUser.getName())
                .password(oldUser.getPassword())
                .email(oldUser.getEmail())
                .isAdmin(oldUser.getIsAdmin())
                .techs(request.getTechs())
                .build();

        var newUser = userRepository.save(userDocument);

        return userMapper.toResponse(newUser);
    }

    public UserResponseDTO getUser(String registration) {
        var user = userRepository.findByRegistration(registration);

        if (user.isEmpty())
            throw new BusinessException(USER_NOT_EXIST);

        var userDTO = userMapper.toResponse(user.get());

        if (Objects.nonNull(user.get().getAvatarId()))
            userDTO.setAvatar(getAvatar(user.get().getAvatarId()));

        return userDTO;

    }

    private StorageResponseDTO getAvatar(String avatarId) {
        return storageService.getFile(avatarId);
    }

    private UserResponseDTO getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
