package com.br.geduc.repository;

import com.br.geduc.document.EventDocument;
import com.br.geduc.dto.enums.EventStatusEnum;
import com.br.geduc.util.SpringContext;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public interface EventRepository extends MongoRepository<EventDocument, String> {

    List<EventDocument> findEventsByStatus(EventStatusEnum status);

    default List<EventDocument> findEvents(String eventNumber, String creatorRegistration, String status, String title, List<String> techs) {
        Criteria criteria = new Criteria();

        if (Objects.nonNull(eventNumber))
            criteria = criteria.and("eventNumber").is(eventNumber);

        if (Objects.nonNull(status))
            criteria = criteria.and("status").is(status);

        if (Objects.isNull(status))
            criteria = criteria.and("status").is("PENDING");

        if (Objects.nonNull(creatorRegistration))
            criteria = criteria.and("creatorRegistration").is(creatorRegistration);

        if (Objects.nonNull(techs) && !techs.isEmpty())
            criteria = criteria.and("techs").in(techs);

        final var query = new Query(criteria);

        if (Objects.nonNull(title))
            query.addCriteria(Criteria.where("title").regex(title, "i"));

        return SpringContext.getBean(MongoTemplate.class).find(query, EventDocument.class);

    }
}
