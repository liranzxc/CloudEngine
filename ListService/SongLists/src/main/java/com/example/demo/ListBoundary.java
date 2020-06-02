package com.example.demo;

import java.util.ArrayList;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class ListBoundary {
	private String id;

	private String name;

	private String userEmail;
	private Date createdTimestamp;
	@JsonIgnore
	private Boolean deleted;

	public ListEntity toEntity() {
		return new ListEntity(id, userEmail, name, createdTimestamp, new ArrayList<>(), deleted);
	}

	public ListBoundary(ListEntity listEntity) {
		super();
		this.id = listEntity.getId();
		this.name = listEntity.getName();
		this.userEmail = listEntity.getUserEmail();
		this.createdTimestamp = listEntity.getCreatedTimestamp();
		this.deleted = listEntity.getDeleted();
	}

	public ListBoundary(String id, String name, String userEmail, Date createdTimestamp, Boolean deleted) {
		super();
		this.id = id;
		this.name = name;
		this.userEmail = userEmail;
		this.createdTimestamp = createdTimestamp;
		this.deleted = deleted;
	}

	public ListBoundary() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public Date getCreatedTimestamp() {
		return createdTimestamp;
	}

	public void setCreatedTimestamp(Date createdTimestamp) {
		this.createdTimestamp = createdTimestamp;
	}

	@JsonIgnore
	public Boolean getDeleted() {
		return deleted;
	}

	@JsonIgnore
	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

}
