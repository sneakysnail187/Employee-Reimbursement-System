package com.example.ERS.service;

import com.example.ERS.entity.User;
import com.example.ERS.entity.Reimbursement;
import com.example.ERS.repository.UserRepository;
import com.example.ERS.repository.ReimbursementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReimbursementRepository reimbursementRepository;

    @Autowired
    JwtService jwtService;
    
    @Transactional
    public User registerUser(User user) { // add duplicate username exception
        if(user.getUsername() == "" || user.getPassword().length() < 4 || 
        userRepository.findUserByUsername(user.getUsername()) != null) {
            return null;
        }
        String hashedPassword = hashPassword(user.getPassword());
        user.setPassword(hashedPassword);
        User fin = userRepository.save(user);
        userRepository.flush();
        return fin;
    }

    public String loginUser(String username, String password) {
        Optional<User> userOptional = Optional.ofNullable(userRepository.findUserByUsername(username));
        if(userOptional.isPresent() && password.equals(userOptional.get().getPassword())) {
            userOptional.get().getPassword();
            String jwt = jwtService.generateToken(userOptional.get());
            return jwt;
        }
        return null;
    }
    
    private String hashPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }
}
