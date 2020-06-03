package com.example.demo;

import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import reactor.core.Exceptions;
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
		list.setSongsIds(new HashSet<String>());
		try {
			emailValidator(list.getUserEmail());
			nameValidator(list.getName());
		}
		catch(Exception e){
			throw Exceptions.propagate(e); 
		}
		return this.lists.save(list);
	}

	@Override
	public Mono<ListEntity> getListById(String listId) {
		return this.lists.findByIdAndDeleted(listId, false).flatMap(list -> {
			return Mono.just(list);
		});

	}

	@Override
	public Mono<Void> updateList(String listId, Map<String, Object> updatedValues) {
		return this.lists.findById(listId).flatMap(oldList -> {
			if (updatedValues.containsKey(ListEntity.NAME_FIELD)) {
				nameValidator((String) updatedValues.get(ListEntity.NAME_FIELD));
				oldList.setName((String) updatedValues.get(ListEntity.NAME_FIELD));
			}

			if (updatedValues.containsKey(ListEntity.EMAIL_FIELD)) {
				emailValidator((String) updatedValues.get(ListEntity.EMAIL_FIELD));
				oldList.setUserEmail((String) updatedValues.get(ListEntity.EMAIL_FIELD));
			}
			if (updatedValues.containsKey(ListEntity.DELETE_FIELD) && updatedValues.keySet().size() == 1
					|| updatedValues.keySet().size() == 0)
			
				oldList.setDeleted(false);
			
			if (oldList.getDeleted() == false)
				return this.lists.save(oldList);
			else
				return Mono.empty();
		}).onErrorResume(e -> Mono.error(new HttpClientErrorException(HttpStatus.BAD_REQUEST
				, e.getMessage()))).flatMap(l -> Mono.empty());
	}

	@Override
	public Mono<Void> addNewSongToList(String listId, SongEntity song) {
		return this.lists.findByIdAndDeleted(listId, false).flatMap(list -> {
			
			song.setPlaylistId(listId);
			return this.songs.save(song)
			.doOnSuccess(songDB -> list.addNewSong(songDB.getSongId()))
			.then( this.lists.save(list));
			
		}).flatMap(l -> Mono.empty());
	}

	@Override
	public Mono<Void> deleteSongFromListById(String listId, String songId) {
		return this.lists.findByIdAndDeleted(listId, false).flatMap(list -> {
			
			list.removeSongById(songId);
			return this.lists.save(list);
		}).flatMap(l -> Mono.empty());
	}

	@Override
	public Flux<SongEntity> getSongsFromList(String listId, String asc, String sortBy) {
		return this.lists.findByIdAndDeleted(listId, false).flatMapMany(songList -> {
			return this.songs.findAllById(songList.getSongsIds()).sort(new Comparator<SongEntity>() {
				@Override
				public int compare(SongEntity o1, SongEntity o2) {
					int val = asc.equals(DESC) ? -1 : 1;
					switch (sortBy) {
					default:
					case SongEntity.ID_Field: {
						return val * o1.getSongId().compareTo(o2.getSongId());
					}
					}
				}
			});
		});
	}

	@Override
	public Flux<ListEntity> getLists(String asc, String sortBy) {
		return this.lists.findByDeleted(false).sort(new Comparator<ListEntity>() {

			@Override
			public int compare(ListEntity o1, ListEntity o2) {
				int val = asc.equals(DESC) ? -1 : 1;
				switch (sortBy) {
				case ListEntity.TIMESTAMP_FIELD: {
					return val * o1.getCreatedTimestamp().compareTo(o2.getCreatedTimestamp());
				}
				case ListEntity.EMAIL_FIELD: {
					return val * o1.getUserEmail().compareTo(o2.getUserEmail());
				}
				case ListEntity.NAME_FIELD: {
					return val * o1.getName().compareTo(o2.getName());
				}
				default:
				case ListEntity.ID_FIELD: {
					return val * o1.getId().compareTo(o2.getId());
				}
				}
			}
		});
	}

	@Override
	public Flux<ListEntity> getListsByUserEmail(String userEmail, String asc, String sortBy) {
		return this.lists.findByDeletedAndUserEmail(false, userEmail).sort(new Comparator<ListEntity>() {

			@Override
			public int compare(ListEntity o1, ListEntity o2) {
				int val = asc.equals(ASC) ? 1 : -1;
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
		Flux<ListEntity> flux = this.lists.findByDeleted(false);
		flux = flux.filter(list -> list.containsSongWithId(songId));
		return flux.sort(new Comparator<ListEntity>() {

			@Override
			public int compare(ListEntity o1, ListEntity o2) {
				int val = asc.equals(ASC) ? 1 : -1;
				switch (sortBy) {
				case ListEntity.TIMESTAMP_FIELD: {
					return val * o1.getCreatedTimestamp().compareTo(o2.getCreatedTimestamp());
				}
				case ListEntity.EMAIL_FIELD: {
					return val * o1.getUserEmail().compareTo(o2.getUserEmail());
				}
				case ListEntity.NAME_FIELD: {
					return val * o1.getName().compareTo(o2.getName());
				}
				default:
				case ListEntity.ID_FIELD: {
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
		}).flatMap(l -> Mono.empty());
	}

	private void emailValidator(String email) {
		String emailRegex = "^[\\w!#$%&�*+/=?`{|}~^-]+(?:\\.[\\w!#$%&�*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";

		Pattern pat = Pattern.compile(emailRegex);
		if (email == null || !pat.matcher(email).matches())
			throw new InvalidEmailException();
	}

	private void nameValidator(String name) {
		if (name == null || name.trim().equals("")) {
			throw new InvalidNameException();
		}
	}

}
