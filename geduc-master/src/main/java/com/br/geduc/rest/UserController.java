package com.br.geduc.rest;


import com.br.geduc.constants.Errors;
import com.br.geduc.dto.request.PasswordUpdateRequestDTO;
import com.br.geduc.dto.request.UserAuthRequestDTO;
import com.br.geduc.dto.request.UserRequestDTO;
import com.br.geduc.dto.request.UserUpdateRequestDTO;
import com.br.geduc.dto.response.UserResponseDTO;
import com.br.geduc.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/user")
@Validated
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseStatus(CREATED)
    public void createUser(@Valid @RequestBody UserRequestDTO user) {
        userService.createUser(user);
    }

    @PostMapping(path = "/auth")
    @ResponseStatus(OK)
    public UserResponseDTO authUser(@Valid @RequestBody UserAuthRequestDTO request) {
        return userService.authUser(request);
    }

    @GetMapping(path = "/{registration}")
    @ResponseStatus(OK)
    public UserResponseDTO getUser(@Valid
                                   @NotBlank(message = Errors.REGISTRATION_IS_REQUIRED)
                                   @PathVariable("registration") String registration) {
        return this.userService.getUser(registration);
    }

    @PutMapping(path = "/update/{registration}")
    @ResponseStatus(OK)
    public UserResponseDTO updateUser(@PathVariable("registration") String registration,
                                      @Valid @RequestBody UserUpdateRequestDTO user) {
        return userService.updateUser(registration, user);
    }

    @PutMapping(path = "/change/password")
    @ResponseStatus(OK)
    public void changePassword(@Valid @RequestBody PasswordUpdateRequestDTO user) {
        userService.changePassword(user);
    }

}
