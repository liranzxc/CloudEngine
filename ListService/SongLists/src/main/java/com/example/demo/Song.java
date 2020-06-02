package com.example.demo;

public class Song {

	private String songId;

	public Song() {
		super();
	}

	public Song(SongEntity song) {
		super();
		this.songId = song.getSongId();
	}

	public Song(String songId) {
		super();
		this.songId = songId;
	}

	public String getSongId() {
		return songId;
	}

	public void setSongId(String songId) {
		this.songId = songId;
	}

	public SongEntity toEntity() {
		return new SongEntity(songId);
	}

}
