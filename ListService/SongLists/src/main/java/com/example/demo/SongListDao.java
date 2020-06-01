package com.example.demo;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface SongListDao extends ReactiveMongoRepository<ListEntity, String> {


}
