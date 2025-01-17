package com.example.ERS.controller;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Lazy;

import com.example.ERS.dto.Request.LoginRequest;
import com.example.ERS.dto.response.UserInfoResponse;
import com.example.ERS.entity.User;
import com.example.ERS.service.ReimbursementService;
import com.example.ERS.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.example.ERS.service.JwtService;

@RestController
public class AuthController {
    
    @Autowired
    @Lazy
    private UserService userService;

    @Autowired
    @Lazy
    JwtService jwtService;

    @PostMapping("/auth/register")
    public ResponseEntity registerUser(@RequestBody User user) {

        Optional<User> userOptional = Optional.ofNullable(userService.registerUser(user));
        if(userOptional.isPresent()) {
            return ResponseEntity.status(200).body(userOptional.get().toString());
        }
        return ResponseEntity.status(409).body(null);
    }

    @GetMapping("/auth/me")
    public ResponseEntity userDetails(@RequestHeader(name="Authorization") String token) {

        Optional<User> userOptional = Optional.ofNullable(jwtService.decodeToken(token));
        if(userOptional.isPresent()) {
            UserInfoResponse userInfo = new UserInfoResponse(userOptional.get().getUsername(), userOptional.get().getFirstName());
            return ResponseEntity.status(200).body(userInfo);
        }
        return ResponseEntity.status(409).body(null);
    }

    @PostMapping("/auth/login")
    public ResponseEntity loginUser(@RequestBody LoginRequest loginRequest) throws JsonProcessingException {
        Optional<String> tokenOptional = Optional.ofNullable(userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword())); 
        //gen token from id
        if(tokenOptional.isPresent()) {
            String jwt = tokenOptional.get();
            return ResponseEntity.status(200).body(jwt);
        }
        return ResponseEntity.status(401).body(null);
    } //pass in a json not a string

    @PostMapping("/auth/logout")
    public ResponseEntity logoutUser(@RequestHeader(name="Authorization") String token) throws JsonProcessingException {
        int id = jwtService.getIdFromToken(token);
        Date expirationDate = (Date) jwtService.getExpirationDateFromToken(token);

        Optional<String> userOptional = Optional.ofNullable(userService.logoutUser(token));
        if(userOptional.isPresent()) {
            return ResponseEntity.status(200).body(userOptional.get().toString());
        }
        return ResponseEntity.status(409).body(null);
    }
}
