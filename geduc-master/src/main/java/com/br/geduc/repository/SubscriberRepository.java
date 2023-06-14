package com.br.geduc.repository;

import com.br.geduc.document.EventDocument;
import com.br.geduc.document.SubscribeDocument;
import com.br.geduc.util.SpringContext;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Objects;

public interface SubscriberRepository extends MongoRepository<SubscribeDocument, String> {

    SubscribeDocument findByEventNumberAndRegistration(String eventNumber, String registration);
    default List<SubscribeDocument> findSubscriber(String registration, String eventNumber) {
        Criteria criteria = new Criteria();
        criteria = criteria.and("registration").is(registration);

        if (Objects.nonNull(eventNumber)) {
            criteria = criteria.and("eventNumber").is(eventNumber);
        }
        final var query = new Query(criteria);

        return SpringContext.getBean(MongoTemplate.class).find(query, SubscribeDocument.class);

    }

    List<SubscribeDocument> findAllSubscibersByEventNumber(String eventNumber);
}
