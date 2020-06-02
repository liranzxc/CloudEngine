package com.example.demo;


import java.util.Comparator;
import java.util.Date;
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
	private SongDao songs;
	
	@Autowired
	public ListServiceDB(ListDao lists, SongDao songs) {
		super();
		this.lists = lists;
		this.songs = songs;
	}
	
	@Override
	public Mono<ListEntity> storeNewList(ListEntity list) {
		list.setId(null);
		list.setDeleted(false);
		list.setCreatedTimestamp(new Date());
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
				{
					list.addNewSong(song);
					this.songs.save(song);
				}	
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
	public Flux<SongEntity> getSongsFromList(String listId, String asc, String sortBy) {
		return this.lists.findById(listId)
				.filter(songList-> songList.getDeleted() == false)
				.flatMapMany(songList->{
					if(songList == null)
						return Flux.empty();
					return Flux.fromIterable(songList.getSongs())
							.sort(new Comparator<SongEntity>() {
								@Override
								public int compare(SongEntity o1, SongEntity o2) {
									int val = asc.equals(ASC)?1:-1;
									switch (sortBy) {
									
									
									
										default:
										case "songId": {						
											return val * o1.getSongId().compareTo(o2.getSongId());
										}
									}
								}
							}
									);
							}
				);
	}

	@Override
	public Flux<ListEntity> getLists(String asc, String sortBy) {
		return this.lists.findAll().filter(list-> list.getDeleted()== false).sort(new Comparator<ListEntity>() {

			@Override
			public int compare(ListEntity o1, ListEntity o2) {
				int val = asc.equals(ASC)?1:-1;
				switch (sortBy) {
					case "createdTimestamp ": {						
						return val * o1.getCreatedTimestamp().compareTo(o2.getCreatedTimestamp());
					}
					case "userEmail ": {						
						return val * o1.getUserEmail().compareTo(o2.getUserEmail());
					}
					case "name": {						
						return val * o1.getName().compareTo(o2.getName());
					}
					default:
					case "id": {						
						return val * o1.getId().compareTo(o2.getId());
					}
				}
			}
		});
	}

	@Override
	public Flux<ListEntity> getListsByUserEmail(String userEmail, String asc, String sortBy) {
		return this.lists.findAll().filter(list-> list.getDeleted()== false).filter(list-> list.getUserEmail().equals(userEmail)).sort(new Comparator<ListEntity>() {

			@Override
			public int compare(ListEntity o1, ListEntity o2) {
				int val = asc.equals(ASC)?1:-1;
				switch (sortBy) {
					case "createdTimestamp ": {						
						return val * o1.getCreatedTimestamp().compareTo(o2.getCreatedTimestamp());
					}
					case "userEmail ": {						
						return val * o1.getUserEmail().compareTo(o2.getUserEmail());
					}
					case "name": {						
						return val * o1.getName().compareTo(o2.getName());
					}
					default:
					case "id": {						
						return val * o1.getId().compareTo(o2.getId());
					}
				}
			}
		});
	}

	@Override
	public Flux<ListEntity> getListsBySongId(String songId, String asc, String sortBy) {
		Flux<ListEntity> test =  this.lists.findAll().filter(list-> list.getDeleted()== false);
		System.err.println("check3");
		test = test.filter(list-> list.containsSongWithId(songId));
		System.err.println("check4");
		return	test.sort(new Comparator<ListEntity>() {

			@Override
			public int compare(ListEntity o1, ListEntity o2) {
				int val = asc.equals(ASC)?1:-1;
				switch (sortBy) {
					case "createdTimestamp ": {						
						return val * o1.getCreatedTimestamp().compareTo(o2.getCreatedTimestamp());
					}
					case "userEmail ": {						
						return val * o1.getUserEmail().compareTo(o2.getUserEmail());
					}
					case "name": {						
						return val * o1.getName().compareTo(o2.getName());
					}
					default:
					case "id": {						
						return val * o1.getId().compareTo(o2.getId());
					}
				}
			}
		});
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
