package com.example.demo;

import java.util.Map;
import java.util.function.Consumer;
import java.util.stream.IntStream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;

@Component
public class ListServiceConsumer implements CommandLineRunner {

	@Override
	public void run(String... args) throws Exception {
		String url = "http://localhost:8092"; // post and delete
		String url2 = "http://localhost:8092/lists/bySongId/{songId}?sortAttr={sortAttr}&orderAttr={orderAttr}";
		String url3 = "http://localhost:8092/lists/byUser/{userEmail}?sortAttr={sortAttr}&orderAttr={orderAttr}";
		String url4 = "http://localhost:8092/lists/{listId}?sortAttr={sortAttr}&orderAttr={orderAttr}";
		String url5 = "http://localhost:8092/lists?sortAttr={sortAttr}&orderAttr={orderAttr}";
		String url6 = "http://localhost:8092/lists/{listId}";// get and put and delete
		String url8 = "http://localhost:8092/lists/{listId}/songs";// PUT
		String url0 = "http://localhost:8092/lists/{listId}/songs/{songId}"; // delete

		WebClient webClientPostList = WebClient.create(url + "/lists");

		System.err.println("consumer initialized and requested GET /demoes");

//		// operation #1 - create many items of data
//		Flux.fromStream(IntStream.range(1, 6).mapToObj(i -> "test" + i))// Flux<String>
//				.flatMap(msg -> webClientPostList.post().accept(MediaType.APPLICATION_JSON)
//						.contentType(MediaType.APPLICATION_JSON)
//						.bodyValue(new ListBoundary(null, msg, msg + "@test.com", null, false)).retrieve()
//						.bodyToMono(ListBoundary.class))
//				.subscribe(postOutput -> {
//					Flux.fromStream(IntStream.range(1, 6).mapToObj(i -> "song" + i))
//							.flatMap(msg -> WebClient.create(url + "/lists/" + postOutput.getId() + "/songs").put()
//									.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
//									.bodyValue(new Song(msg)).retrieve().bodyToMono(Map.class))
//							.doOnComplete(new Runnable() {
//
//								@Override
//								public void run() {
//									// TODO Auto-generated method stub
//									System.err.println("finished adding songs");
//								}
//							});
//				}, e -> e.printStackTrace(), () -> {
//				}, subscribable -> subscribable.request(1));

	}

}
