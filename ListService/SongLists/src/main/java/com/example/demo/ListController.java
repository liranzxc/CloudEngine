package com.example.demo;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
public class ListController {
	public static final String SORT_ATTR = "sortAttr";
	public static final String ORDER_ATTR = "orderAttr";
	private ListService listService;
	
	@Autowired
	public ListController(ListService listService) {
		super();
		this.listService = listService;
	}
	
	@RequestMapping(path="/lists",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Mono<ListBoundary> addNewList(@RequestBody ListBoundary newList) {
		return this.listService
			.storeNewList(newList.toEntity())
			.map(ListBoundary::new);
	}
	
	@RequestMapping(path="/lists/{listId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	public Mono<ListBoundary> getListById(@PathVariable("listId") String listId) {
		return this.listService
			.getListById(listId)
			.map(ListBoundary::new);
	}
	
	@RequestMapping(
			path="/lists/{listId}",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE)
		public Mono<Void> updateListById(@PathVariable("listId") String listId, @RequestBody Map<String, Object> updatedValues) {
		
			return listService.updateList(listId, updatedValues);
			
		}
	
	@RequestMapping(
			path="/lists/{listId}/songs",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE)
		public Mono<Void> addSongToList(@PathVariable("listId") String listId, @RequestBody Song song) {
			System.err.println("adding new song");
			return listService.addNewSongToList(listId, song.toEntity());
			
		}
	
	@RequestMapping(
			path="/lists/{listId}/songs/{songId}",
			method = RequestMethod.DELETE)
		public Mono<Void> deleteSongFromList(@PathVariable("listId") String listId, @PathVariable("songId") String songId) {
		
			return listService.deleteSongFromListById(listId, songId);
			
		}
	
	@RequestMapping(
			path="/lists",
			method = RequestMethod.DELETE)
		public Mono<Void> deleteAll() {
		
			return listService.deleteAllLists();
		}
	
	@RequestMapping(
			path="/lists/{listId}",
			method = RequestMethod.DELETE)
		public Mono<Void> deleteList(@PathVariable("listId") String listId) {
		
			return listService.deleteListById(listId);
		}
	
	@RequestMapping(path="/lists/{listId}/songs",
			method = RequestMethod.GET,
			produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<Song> getSongsFromList(@PathVariable("listId") String listId,
			@RequestParam(name = ORDER_ATTR, required = false, defaultValue = ListService.ASC) String asc, 
			@RequestParam(name = SORT_ATTR, required = false, defaultValue = SongEntity.ID_Field) String sortBy) {
		return this.listService.getSongsFromList(listId, asc, sortBy).map(Song::new);
	}
	
	@RequestMapping(path="/lists",
			method = RequestMethod.GET,
			produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<ListBoundary> getLists(
			@RequestParam(name = ORDER_ATTR, required = false, defaultValue = ListService.ASC) String asc, 
			@RequestParam(name = SORT_ATTR, required = false, defaultValue = ListEntity.ID_FIELD) String sortBy) {
		return this.listService
			.getLists(asc, sortBy).map(ListBoundary::new);
	}
	
	@RequestMapping(path="/lists/byUser/{userEmail}",
			method = RequestMethod.GET,
			produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<ListBoundary> getListsByEmail(@PathVariable("userEmail") String userEmail,
			@RequestParam(name = ORDER_ATTR, required = false, defaultValue = ListService.ASC) String asc, 
			@RequestParam(name = SORT_ATTR, required = false, defaultValue = ListEntity.ID_FIELD) String sortBy) {
		return this.listService
			.getListsByUserEmail(userEmail, asc, sortBy).map(ListBoundary::new);
	}
	
	@RequestMapping(path="/lists/bySongId/{songId}",
			method = RequestMethod.GET,
			produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<ListBoundary> getListsBySongId(@PathVariable("songId") String songId,
			@RequestParam(name = ORDER_ATTR, required = false, defaultValue = ListService.ASC) String asc, 
			@RequestParam(name = SORT_ATTR, required = false, defaultValue = ListEntity.ID_FIELD) String sortBy) {
		return this.listService
			.getListsBySongId(songId, asc, sortBy).map(ListBoundary::new);
	}
	
	@ExceptionHandler
	public Mono<HttpClientErrorException> handleException(Exception e) {
		return Mono.error(e);
	}
}
