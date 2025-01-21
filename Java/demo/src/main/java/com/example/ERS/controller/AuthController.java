package com.example.ERS.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.redis.RedisProperties.Lettuce.Cluster.Refresh;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Lazy;

import com.example.ERS.dto.Request.LoginRequest;
import com.example.ERS.dto.Request.TokenRefreshRequest;
import com.example.ERS.dto.response.UserInfoResponse;
import com.example.ERS.entity.RefreshToken;
import com.example.ERS.entity.User;
import com.example.ERS.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.example.ERS.service.JwtService;
import com.example.ERS.service.RefreshTokenService;
import com.example.ERS.dto.response.JWTResponse;

@RestController
public class AuthController {
    
    @Autowired
    @Lazy
    private UserService userService;

    @Autowired
    @Lazy
    JwtService jwtService;

    @Autowired
    @Lazy
    RefreshTokenService refreshTokenService;

    @GetMapping("/auth/me")
    public ResponseEntity userDetails(@RequestHeader(name="Authorization") String token) {

        Optional<User> userOptional = Optional.ofNullable(jwtService.decodeToken(token));
        if(userOptional.isPresent()) {
            UserInfoResponse userInfo = new UserInfoResponse(userOptional.get().getUsername(), userOptional.get().getFirstName());
            return ResponseEntity.status(200).body(userInfo);
        }
        return ResponseEntity.status(409).body(null);
    }

    @PostMapping("/auth/register")
    public ResponseEntity registerUser(@RequestBody User user) {

        Optional<User> userOptional = Optional.ofNullable(userService.registerUser(user));
        if(userOptional.isPresent()) {
            return ResponseEntity.status(200).body(userOptional.get().toString());
        }
        return ResponseEntity.status(409).body(null);
    }

    @PostMapping("/auth/login")
    public ResponseEntity loginUser(@RequestBody LoginRequest loginRequest) throws JsonProcessingException {
        Optional<String> tokenOptional = Optional.ofNullable(userService.loginUser(loginRequest.getUsername(), loginRequest.getPassword())); 
        //gen token from id
        if(tokenOptional.isPresent()) {
            String jwt = tokenOptional.get();
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(jwtService.decodeToken(jwt).getUserId());
            JWTResponse jwtResponse = new JWTResponse(jwt, refreshToken.getToken());
            return ResponseEntity.status(200).body(jwtResponse);
        }
        return ResponseEntity.status(401).body(null);
    } //pass in a json not a string

    @PostMapping("/auth/logout")
    public ResponseEntity logoutUser(@RequestHeader(name="Authorization") String token) throws JsonProcessingException {
        Optional<String> tokenOptional = Optional.ofNullable(userService.logoutUser(token)); 
        //gen token from id
        if(tokenOptional.isPresent()) {
            String jwt = tokenOptional.get();
            return ResponseEntity.status(200).body(jwt);
        }
        return ResponseEntity.status(401).body(null);
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity refreshToken(@RequestHeader(name="Authorization") String token, @RequestBody TokenRefreshRequest refreshToken) throws JsonProcessingException {
        String refreshTokenString = refreshToken.getRefreshToken();
        
        return refreshTokenService.findByToken(refreshTokenString)
            .map(refreshTokenService::verifyExpiration)
            .map(RefreshToken::getUserId)
            .map(user -> ResponseEntity.status(200).body(tokenService)).orElseGet(() ->
            
        );
    }
}
