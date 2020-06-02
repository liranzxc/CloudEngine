package com.example.demo;

import java.util.Map;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ListService {
	
	public Mono<ListEntity> storeNewList(ListEntity list);
	
	public Mono<ListEntity> getListById(String listId);
	
	public Mono<Void> updateList(String listId, Map<String, Object> list); 

	public Mono<Void> addNewSongToList(String listId, SongEntity song);
	
	public Mono<Void> deleteSongFromListById(String listId, String songId);
	
	public Flux<SongEntity> getSongsFromList(String listId, boolean asc, String sortBy);
	
	public Flux<ListEntity> getLists(boolean asc, String sortBy);
	
	public Flux<ListEntity> getListsByUserEmail(String userEmail, boolean asc, String sortBy);
	
	public Flux<ListEntity> getListsBySongId(String songId, boolean asc, String sortBy);
	
	public Mono<Void> deleteAllLists();
	
	public Mono<Void> deleteListById(String listId);

}
