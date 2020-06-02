package com.example.demo;

import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Service
public class ListServiceDB implements ListService {

	private ListDao lists;
	
	@Autowired
	public ListServiceDB(ListDao lists) {
		super();
		this.lists = lists;
	}
	
	@Override
	public Mono<ListEntity> storeNewList(ListEntity list) {
		list.setId(null);
		list.setDeleted(false);
		emailValidator(list.getUserEmail());
		nameValidator(list.getName());
		return this.lists.save(list);
	}

	@Override
	public Mono<ListEntity> getListById(String listId) {
		return this.lists.findById(listId).flatMap(list -> {
			if(list.getDeleted() == true)
				return Mono.empty();
			else
				return Mono.just(list);
		});
		
	}

	@Override
	public Mono<Void> updateList(String listId, Map<String, Object> updatedValues) {
		return this.lists.findById(listId).flatMap(oldList -> {
			if(updatedValues.containsKey(ListEntity.fields.name.toString()))
			{
				nameValidator((String)updatedValues.get(ListEntity.fields.name.toString()));
				oldList.setName((String)updatedValues.get(ListEntity.fields.name.toString()));
			}
			
			if(updatedValues.containsKey(ListEntity.fields.userEmail.toString()))
			{
				emailValidator((String)updatedValues.get(ListEntity.fields.userEmail.toString()));
				oldList.setUserEmail((String)updatedValues.get(ListEntity.fields.userEmail.toString()));
			}
			if(updatedValues.containsKey(ListEntity.fields.deleted.toString()) && updatedValues.keySet().size() == 1 || updatedValues.keySet().size() == 0)
				oldList.setDeleted(false);
			
			if(oldList.getDeleted() == false)
				return this.lists.save(oldList);
			else
				return Mono.empty();
		}).flatMap(l->Mono.empty());
		
		
	}

	@Override
	public Mono<Void> addNewSongToList(String listId, SongEntity song) {
		return this.lists.findById(listId).flatMap(list -> {
			if(list.getDeleted() == false) {
				if(list.getSongs() != null)
					list.addNewSong(song);
				return this.lists.save(list);
			}
			else
				return Mono.empty();
		}).flatMap(l->Mono.empty());
	}

	@Override
	public Mono<Void> deleteSongFromListById(String listId, String songId) {
		return this.lists.findById(listId).flatMap(list -> {
			if(list.getDeleted() == false) {
				if(list.getSongs() != null)
					list.removeSongById(songId);
				return this.lists.save(list);
			}
			else
				return Mono.empty();
		}).flatMap(l->Mono.empty());
	}

	@Override
	public Flux<SongEntity> getSongsFromList(String listId, boolean asc, String sortBy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Flux<ListEntity> getLists(boolean asc, String sortBy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Flux<ListEntity> getListsByUserEmail(String userEmail, boolean asc, String sortBy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Flux<ListEntity> getListsBySongId(String songId, boolean asc, String sortBy) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Mono<Void> deleteAllLists() {
		return this.lists.deleteAll();
	}

	@Override
	public Mono<Void> deleteListById(String listId) {
		return this.lists.findById(listId).flatMap(list -> {
			list.setDeleted(true);
			return this.lists.save(list);
		}).flatMap(l->Mono.empty());
	}
	
	
	private void emailValidator(String email) {
		String emailRegex = "^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$"; 
                  
		Pattern pat = Pattern.compile(emailRegex); 
		if (email == null || !pat.matcher(email).matches()) 
			throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Email not formatted well.");
		return;
	}
	
	private void nameValidator(String name) {
		if (name == null || name.trim().equals("")) {
			throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Name must not be null or empty.");
		}
	}



}
