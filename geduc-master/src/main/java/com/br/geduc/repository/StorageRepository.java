package com.br.geduc.repository;

import com.br.geduc.document.StorageFileDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageRepository extends MongoRepository<StorageFileDocument, String> {
}
