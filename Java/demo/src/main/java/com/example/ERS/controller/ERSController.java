package com.example.ERS.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties.Jwt;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.example.ERS.entity.User;
import com.example.ERS.entity.Reimbursement;
import com.example.ERS.service.ReimbursementService;
import com.example.ERS.service.UserService;
import com.example.ERS.service.JwtService;


@RestController
public class ERSController {
    
    @Autowired
    @Lazy
    private UserService userService;
    
    @Autowired
    @Lazy
    private ReimbursementService reimbursementService;

    @Autowired
    JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody User user) {

        Optional<User> userOptional = Optional.ofNullable(userService.registerUser(user));
        if(userOptional.isPresent()) {
            return ResponseEntity.status(200).body(userOptional.toString());
        }
        return ResponseEntity.status(400).body(null);
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody String username, @RequestBody String password) {
        Optional<User> userOptional = Optional.ofNullable(userService.loginUser(username, password));
        //gen token from id
        if(userOptional.isPresent()) {
            String jwt = jwtService.generateToken(userOptional.get());
            return ResponseEntity.status(200).body(jwt);
        }
        return ResponseEntity.status(401).body(null);
    }
    //reimbursements will use the designated token
    //on returning use the reimb response  dto
}
