package com.br.geduc.repository;

import com.br.geduc.document.NotificationDocument;
import com.br.geduc.util.SpringContext;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<NotificationDocument, String>  {

    default List<NotificationDocument> findByRegistrationNotReaded(String registration) {
        Criteria criteria = new Criteria();
        criteria = criteria.and("status").is("PENDING");
        criteria = criteria.and("registration").is(registration);

        final var query = new Query(criteria);

        return SpringContext.getBean(MongoTemplate.class).find(query, NotificationDocument.class);

    }

}
