package com.example.demo;

import java.util.Map;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ListService {

	String ASC = "ASC";
	String DESC = "DESC";

	public Mono<ListEntity> storeNewList(ListEntity list);

	public Mono<ListEntity> getListById(String listId);

	public Mono<Void> updateList(String listId, Map<String, Object> list);

	public Mono<Void> addNewSongToList(String listId, SongEntity song);

	public Mono<Void> deleteSongFromListById(String listId, String songId);

	public Flux<SongEntity> getSongsFromList(String listId, String asc, String sortBy);

	public Flux<ListEntity> getLists(String asc, String sortBy);

	public Flux<ListEntity> getListsByUserEmail(String userEmail, String asc, String sortBy);

	public Flux<ListEntity> getListsBySongId(String songId, String asc, String sortBy);

	public Mono<Void> deleteAllLists();

	public Mono<Void> deleteListById(String listId);

}
