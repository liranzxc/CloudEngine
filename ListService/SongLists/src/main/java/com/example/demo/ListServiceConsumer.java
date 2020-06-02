package com.example.demo;


import java.util.Map;
import java.util.stream.IntStream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;

@Component
public class ListServiceConsumer implements CommandLineRunner{

	@Override
	public void run(String... args) throws Exception {
		String url = "http://localhost:8092/lists"; // post and delete
		String url2 = "http://localhost:8092/lists/bySongId/{songId}?sortAttr={sortAttr}&orderAttr={orderAttr}";
		String url3 = "http://localhost:8092/lists/byUser/{userEmail}?sortAttr={sortAttr}&orderAttr={orderAttr}";
		String url4 = "http://localhost:8092/lists/{listId}?sortAttr={sortAttr}&orderAttr={orderAttr}";
		String url5 = "http://localhost:8092/lists?sortAttr={sortAttr}&orderAttr={orderAttr}";
		String url6 = "http://localhost:8092/lists/{listId}";// get and put and delete
		String url8 = "http://localhost:8092/lists/{listId}/songs";// PUT 
		String url0 = "http://localhost:8092/lists/{listId}/songs/{songId}"; //delete
		
		WebClient webClient = WebClient.create(url);
		
		System.err.println("consumer initialized and requested GET /demoes");
		
		// operation #1 - create many items of data
		Flux.fromStream(
			IntStream.range(1, 100+1)
			.mapToObj(i->"user#" + i)
		)// Flux<String>
		.flatMap(msg ->
		webClient
			.post()
			.accept(MediaType.APPLICATION_JSON)
			.contentType(MediaType.APPLICATION_JSON)
			.bodyValue(new ListBoundary(null, msg, msg+"check.com", null, false))
			.retrieve()
			.bodyToMono(ListBoundary.class)
		).subscribe(
				postOutput->System.err.println("successfully created new data"),
				e->e.printStackTrace(),
				()-> 
				webClient
					.get()
					.accept(MediaType.TEXT_EVENT_STREAM)
					.retrieve()
					.bodyToFlux(Map.class)
				.doOnComplete(()->
				
				webClient
				.delete()
				.retrieve()
				.bodyToMono(Void.class)
				.subscribe(demo->
			System.err.println("*** delete operation retrieved new data: " + demo),
			
			error->System.err.println("*** something wrong happened while deleting"),// handle errors
			
			()->System.err.println("*** done consuming data from service using delete"),// complete runnable
			
			subscription->subscription.request(20) // subscription handling
			
			)
		)
				
				.subscribe(demo->
				System.err.println("retrieved new data: " + demo),
				
				error->
				//System.err.println("something wrong happened"),
				error.printStackTrace(), // handle errors
				
				()->System.err.println("done consuming data from service")//,// complete runnable
			
//				subscription->subscription.request(20) // subscription handling
				
				)
				);


		
	}

}
