package com.example.demo;

import java.time.Duration;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import reactor.core.publisher.Mono;

//	TODO restore list if map is empty or contains "deleted : false" - PUT /lists/{listId}
//	TODO timestamp yyyy-MM-dd'T'HH:mm:ss.SSSZ
//	TODO check mail
//	TODO reactive exceptions
//	TODO deal with deleted lists

@Service
public class ReactiveListServiceImpl implements ReactiveListService {

	private SongListDao songLists;
	
	@Autowired
	public ReactiveListServiceImpl(SongListDao dummies) {
		super();
		this.songLists = dummies;
	}

	@Override
	public Mono<ListEntity> getListById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Mono<ListEntity> createNewList(ListEntity entity) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Mono<Void> updateList(String listId, Map<String, Object> updateValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Mono<Void> addSongToList(String listId, Song song) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Mono<Void> deleteSongFromList(String listId, String songId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Mono<Void> deleteAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Mono<Void> deleteList(String listId) {
		// TODO Auto-generated method stub
		return null;
	}

	

}
