package com.ERS.Java.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.ERS.Java.entity.User;
import com.ERS.Java.entity.Reimbursement;
import com.ERS.Java.service.ReimbursementService;
import com.ERS.Java.service.UserService;


@RestController
public class ERSController {
    
    @Autowired
    @Lazy
    private UserService userService;
    
    @Autowired
    @Lazy
    private ReimbursementService reimbursementService;

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody User user) {

        Optional<User> userOptional = Optional.ofNullable(userService.registerUser(user));
        if(userOptional.isPresent()) {
            return ResponseEntity.status(200).body(userOptional.toString());
        }
        return ResponseEntity.status(400).body(null);
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestBody User user) {
        Optional<User> userOptional = Optional.ofNullable(userService.loginUser(user));
        if(userOptional.isPresent()) {
            return ResponseEntity.status(200).body(userOptional.get());
        }
        return ResponseEntity.status(401).body(null);
    }
}
