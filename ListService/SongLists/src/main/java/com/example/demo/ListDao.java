package com.example.demo;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface ListDao extends ReactiveMongoRepository<ListEntity, String> {

}
