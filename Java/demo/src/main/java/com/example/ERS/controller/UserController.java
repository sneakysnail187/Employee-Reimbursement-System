package com.example.ERS.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Lazy;

import com.example.ERS.dto.Request.LoginRequest;
import com.example.ERS.entity.User;
import com.example.ERS.service.ReimbursementService;
import com.example.ERS.service.UserService;
import com.example.ERS.service.JwtService;

@RestController
public class UserController {
    
    @Autowired
    @Lazy
    private UserService userService;
    
    @Autowired
    @Lazy
    private ReimbursementService reimbursementService;

    @Autowired
    JwtService jwtService;

    @GetMapping("/user")
    public ResponseEntity getUsers(@RequestHeader(name="Authorization") String token) {

        List<User> users = userService.getAllUsers(token);

        if(users != null) {
            return ResponseEntity.status(200).body(users.toString());
        }
        return ResponseEntity.status(401).body(null);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity deleteUser(@RequestHeader(name="Authorization") String token, @PathVariable Integer id) {

        Optional<User> userOptional = Optional.ofNullable(userService.deleteUser(id, token));

        if(userOptional.isPresent()) {
            return ResponseEntity.status(200).body(userOptional.get().toString());
        }
        return ResponseEntity.status(401).body(null);
    } //pass in a json not a string
}
