package com.example.demo;


import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;


@Document(collection = "SONGS")
public class SongEntity {
	
	@MongoId
	private String songId;
	
	public SongEntity() {
		super();
	}
	public SongEntity(String songId) {
		super();
		this.songId = songId;
	}
	public String getSongId() {
		return songId;
	}
	public void setSongId(String songId) {
		this.songId = songId;
	}

}
