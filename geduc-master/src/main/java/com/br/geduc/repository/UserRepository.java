package com.br.geduc.repository;

import com.br.geduc.document.UserDocument;
import com.br.geduc.dto.response.UserResponseDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserDocument, String> {

    Optional<UserDocument> findByRegistration(String registration);
    UserResponseDTO findByEmail(String email);

    Optional<UserDocument> findByRegistrationAndEmail(String registration, String email);

}
