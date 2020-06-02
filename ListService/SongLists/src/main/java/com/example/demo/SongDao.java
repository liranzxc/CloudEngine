package com.example.demo;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface SongDao extends ReactiveMongoRepository<SongEntity, String> {

}
