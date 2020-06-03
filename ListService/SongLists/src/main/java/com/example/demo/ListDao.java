package com.example.demo;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ListDao extends ReactiveMongoRepository<ListEntity, String> {

	Mono<ListEntity> findByIdAndDeleted(String listId, boolean deleted);
	
	Flux<ListEntity> findByDeleted(boolean deleted);
	
	Flux<ListEntity> findByDeletedAndUserEmail(boolean deleted, String email);
}
