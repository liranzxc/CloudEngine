package com.example.demo;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "SONGS")
public class SongEntity {

	@Id
	private String songId;
	
	private String playlistId;

	public static final String ID_Field = "songId";

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

	public String getPlaylistId() {
		return playlistId;
	}

	public void setPlaylistId(String playlistId) {
		this.playlistId = playlistId;
	}

}
