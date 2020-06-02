package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class ListServiceConsumer implements CommandLineRunner{

	@Override
	public void run(String... args) throws Exception {
		String url = "http://localhost:8092/lists";
		
		WebClient webClient = WebClient.create(url);
		
	}

}
