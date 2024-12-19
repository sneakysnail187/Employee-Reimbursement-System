package com.example.ERS.service;

import com.example.ERS.entity.User;
import com.example.ERS.entity.Reimbursement;
import com.example.ERS.repository.UserRepository;
import com.example.ERS.repository.ReimbursementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder; 
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReimbursementRepository reimbursementRepository;

    @Autowired
    JwtService jwtService;

    @Autowired
    @Lazy
    PasswordEncoder encoder;
    
    public User registerUser(User user) { // add duplicate username exception
        String jwt = jwtService.generateToken(user);
        user.setPassword(jwt);
        if(user.getUsername() == "" || user.getPassword().length() < 4) {
            return null;
        }

        return userRepository.save(user);
    }

    public User loginUser(String username, String password) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findUserByUsername(username));
        if(userOptional.isPresent() && password.equals(userOptional.get().getPassword())) {
            return userOptional.get();
        }
        return null;
    }
    
}
