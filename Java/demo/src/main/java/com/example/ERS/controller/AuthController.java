package com.example.ERS.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Lazy;

import com.example.ERS.dto.Request.EditRequest;
import com.example.ERS.dto.Request.LoginRequest;
import com.example.ERS.entity.User;
import com.example.ERS.service.ReimbursementService;
import com.example.ERS.service.UserService;
import com.example.ERS.service.JwtService;

@RestController
public class AuthController {
    
    @Autowired
    @Lazy
    private UserService userService;
    
    @Autowired
    @Lazy
    private ReimbursementService reimbursementService;

    @Autowired
    JwtService jwtService;

    @PostMapping("/auth/register")
    public ResponseEntity registerUser(@RequestBody User user) {

        Optional<User> userOptional = Optional.ofNullable(userService.registerUser(user));
        if(userOptional.isPresent()) {
            return ResponseEntity.status(200).body(userOptional.get().toString());
        }
        return ResponseEntity.status(409).body(null);
    }

    @PostMapping("/auth/login")
    public ResponseEntity loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<String> tokenOptional = Optional.ofNullable(userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword())); 
        //gen token from id
        if(tokenOptional.isPresent()) {
            String jwt = tokenOptional.get();
            return ResponseEntity.status(200).body(jwt);
        }
        return ResponseEntity.status(401).body(null);
    } //pass in a json not a string

    //reimbursements will use the designated token
    //on returning use the reimb response  dto
}
