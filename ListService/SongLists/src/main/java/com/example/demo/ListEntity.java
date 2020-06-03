package com.example.demo;

import java.util.Date;
import java.util.Set;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "LISTS")
public class ListEntity {
	@Id
	private String id;
	private String userEmail;
	private String name;
	@CreatedDate
	private Date createdTimestamp;
	private Boolean deleted;
	@Field
	private Set<String> songsIds;

	public static final String ID_FIELD = "id";
	public static final String EMAIL_FIELD = "userEmail";
	public static final String NAME_FIELD = "name";
	public static final String TIMESTAMP_FIELD = "createdTimestamp";
	public static final String DELETE_FIELD = "deleted";
	public static final String SONGS_FIELD = "Songs";

	public ListEntity() {
		super();
	}

	public ListEntity(String id, String userEmail, String name, Date createdTimestamp, 
			Set<String> songsIds,
			Boolean deleted) {
		super();
		this.id = id;
		this.userEmail = userEmail;
		this.name = name;
		this.createdTimestamp = createdTimestamp;
		this.deleted = deleted;
		this.songsIds = songsIds;
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

	

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Set<String> getSongsIds() {
		return songsIds;
	}

	public void setSongsIds(Set<String> songsIds) {
		this.songsIds = songsIds;
	}

	public void addNewSong(String songId) {
		
		this.songsIds.add(songId);
	}

	public void removeSongById(String songId) {
		this.songsIds.removeIf(s -> s.equals(songId));
	}

	public boolean containsSongWithId(String songId) {
		
		
		if (this.songsIds == null || this.songsIds.isEmpty()) {
			return false;
		}
		return this.songsIds.stream().anyMatch(s -> s != null ? s.equals(songId) : false);
	}

}
