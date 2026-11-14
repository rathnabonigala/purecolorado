package com.BMart.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.BMart.dto.SignupDTO;
import com.BMart.dto.UserDTO;
import com.BMart.enums.UserRole;
import com.BMart.model.User;
import com.BMart.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
@Autowired
private UserRepository userRepository;



@Override

public UserDTO createUser(SignupDTO signupDTO) {
	
	User user = new User();
	user.setName(signupDTO.getName());
	user.setEmail(signupDTO.getEmail());
	user.setUserRole(UserRole.USER);
	user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));
	userRepository.save(user);
	return user.mapUserToUserDTO();

	
}

}
