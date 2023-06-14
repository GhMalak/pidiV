package com.br.geduc.repository;

import com.br.geduc.document.CertificateDocument;
import com.br.geduc.document.SubscribeDocument;
import com.br.geduc.util.SpringContext;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Objects;

public interface CertificateRepository extends MongoRepository<CertificateDocument, String> {

    List<CertificateDocument> findByRegistration(String registration);
    CertificateDocument findByRegistrationAndEventNumber(String registration, String eventNumber);
}
