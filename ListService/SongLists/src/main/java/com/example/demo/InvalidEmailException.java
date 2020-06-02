package com.example.demo;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class InvalidEmailException extends HttpClientErrorException {

	private static final long serialVersionUID = 3840370706933864603L;

	public InvalidEmailException() {
		this(HttpStatus.BAD_REQUEST, "Email not formatted well.");
	}

	public InvalidEmailException(HttpStatus statusCode, String statusText) {
		super(statusCode, statusText);
	}

}
