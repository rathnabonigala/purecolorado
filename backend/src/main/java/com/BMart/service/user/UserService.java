package com.BMart.service.user;

import com.BMart.dto.SignupDTO;
import com.BMart.dto.UserDTO;

public interface UserService {

	UserDTO createUser(SignupDTO signupDTO);
	
	

}
