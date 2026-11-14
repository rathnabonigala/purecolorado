package com.BMart.dto;

import com.BMart.enums.UserRole;

public class UserDTO {

	public UserDTO(Long id, String email, String name, UserRole userRole) {
	    this.id = id;
	    this.email = email;
	    this.name = name;
	    this.userRole = userRole;
	}

	private Long id;
	private String name;
	private String email;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public UserRole getUserRole() {
		return userRole;
	}
	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}
	private String password;
	private UserRole userRole;
	//private byte[] img;
	//private MultipartFile img;
}
