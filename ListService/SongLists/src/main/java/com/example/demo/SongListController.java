package com.example.demo;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;


@RestController
public class SongListController {

	private ReactiveListService reactiveService;
	
	@Autowired
	public SongListController(ReactiveListService reactiveService) {
		super();
		this.reactiveService = reactiveService;
	}
	
	@RequestMapping(
			path="/lists",
			method = RequestMethod.POST,
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE)
		public Mono<ListBoundary> createNewList(@RequestBody ListBoundary list) {
		
			return reactiveService.createNewList(list.toEntity()).map(ListBoundary::new);
		}
	
	@RequestMapping(
			path="/lists/{listId}",
			method = RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
		public Mono<ListBoundary> getList(@PathVariable("listId") String id) {
		
			return reactiveService.getListById(id).map(ListBoundary::new);

		}
	
	@RequestMapping(
			path="/lists/{listId}",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE)
		public Mono<Void> updateListById(@PathVariable("listId") String listId, @RequestBody Map<String, Object> updateValues) {
		
			return reactiveService.updateList(listId, updateValues);
			
		}
	
	@RequestMapping(
			path="/lists/{listId}/songs",
			method = RequestMethod.PUT,
			consumes = MediaType.APPLICATION_JSON_VALUE)
		public Mono<Void> addSongToList(@PathVariable("listId") String listId, @RequestBody Song song) {
		
			return reactiveService.addSongToList(listId, song);
			
		}
	
	@RequestMapping(
			path="/lists/{listId}/songs/{songId}",
			method = RequestMethod.DELETE)
		public Mono<Void> deleteSongFromList(@PathVariable("listId") String listId, @PathVariable("songId") String songId) {
		
			return reactiveService.deleteSongFromList(listId, songId);
			
		}
	
	@RequestMapping(
			path="/lists",
			method = RequestMethod.DELETE)
		public Mono<Void> deleteAll() {
		
			return reactiveService.deleteAll();
		}
	
	@RequestMapping(
			path="/lists/{listId}",
			method = RequestMethod.DELETE)
		public Mono<Void> deleteList(@PathVariable("listId") String listId) {
		
			return reactiveService.deleteList(listId);
		}

}
