package com.example.demo;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "LISTS")
public class ListEntity {
	@Id
	private String id;
	
	 @Email(message="invalid e-mail")
	private String userEmail;
	 
	private String name;
	
	@CreatedDate
	private Date createdTimestamp;
	
	 @DBRef(db="address")
	private Set<Song> Songs;
	
	 private boolean deleted;
	 
	public ListEntity() {
		super();
	}

	public ListEntity(String id, String userEmail, String name, Date createdTimestamp, Set<Song> Songs) {
		super();
		this.id = id;
		this.userEmail = userEmail;
		this.name = name;
		this.createdTimestamp = createdTimestamp;
		this.deleted = false;
		this.Songs = new HashSet<>();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	public Set<Song> getSongs() {
		return Songs;
	}

	public void setSongs(Set<Song> songs) {
		Songs = songs;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	
}
