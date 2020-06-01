package com.example.demo;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "SONGS")
public class SongEntity {
	
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
