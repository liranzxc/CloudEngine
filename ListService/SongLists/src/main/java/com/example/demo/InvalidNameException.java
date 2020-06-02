package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class InvalidNameException extends HttpClientErrorException {

	private static final long serialVersionUID = 3840370706933864603L;

	public InvalidNameException() {
		this(HttpStatus.BAD_REQUEST, "Name must not be null or empty.");
	}

	public InvalidNameException(HttpStatus statusCode, String statusText) {
		super(statusCode, statusText);
	}

}
