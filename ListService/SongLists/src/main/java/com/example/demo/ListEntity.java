package com.example.demo;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "LISTS")
public class ListEntity {
	@Id
	private String id;
	private String userEmail;
	private String name;
	@CreatedDate
	private Date createdTimestamp;
	@DBRef(db="Cluster0")
	private List<SongEntity> Songs;
	private Boolean deleted; 
//	public static enum fields {ID("id"),USEREMAIL("userEmail"),NAME("name"),CREATEDTIMESTAMP("createdTimestamp")}
	public static enum fields {id,userEmail,name,createdTimestamp,deleted,Songs}

	public ListEntity() {
		super();
	}

	public ListEntity(String id, String userEmail, String name, Date createdTimestamp, List<SongEntity> songs, Boolean deleted) {
		super();
		this.id = id;
		this.userEmail = userEmail;
		this.name = name;
		this.createdTimestamp = createdTimestamp;
		this.Songs = songs;
		this.deleted = deleted;
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

	public List<SongEntity> getSongs() {
		return Songs;
	}

	public void setSongs(List<SongEntity> songs) {
		Songs = songs;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}
	
	public void addNewSong(SongEntity songEntity) {
		this.Songs.add(songEntity);
	}
	
	public void removeSongById(String songId) {
		this.Songs.removeIf(s -> s.getSongId().equals(songId));
	}
	
	public boolean containsSongWithId(String songId) {
		return this.Songs.stream().anyMatch(s->  s.getSongId().equals(songId));
	}
	
}
