package com.example.demo;

import java.util.Map;

import reactor.core.publisher.Mono;

public interface ReactiveListService {
	
	String Ascending = "ASC";

	String Descending = "DESC";
	
	Mono<ListEntity> getListById(String id);

	Mono<ListEntity> createNewList(ListEntity entity);
	
	Mono<Void> updateList(String listId, Map<String, Object> updateValues);

	Mono<Void> addSongToList(String listId, Song song);

	Mono<Void> deleteSongFromList(String listId, String songId);

	Mono<Void> deleteAll();

	Mono<Void> deleteList(String listId);

	

}
