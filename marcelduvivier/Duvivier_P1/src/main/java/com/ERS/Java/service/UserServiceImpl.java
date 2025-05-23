package com.ERS.Java.service;

import com.ERS.Java.entity.User;
import com.ERS.Java.repository.UserRepository;
import com.ERS.Java.repository.ReimbursementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReimbursementRepository reimbursementRepository;
    
    public User registerUser(User user) { // add duplicate username exception
        if(user.getUsername() == "" || user.getPassword().length() < 4) {
            return null;
        }
        return userRepository.save(user);
    }

    public User loginUser(User user) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findUserByUsername(user.getUsername()));
        if(userOptional.isPresent() && user.getPassword().equals(userOptional.get().getPassword())) {
            return userOptional.get();
            
        }
        return null;
    }
    
}
