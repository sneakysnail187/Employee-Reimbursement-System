package com.example.ERS.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.example.ERS.dto.response.TokenRefreshResponse;

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
        if(!jwtService.validateToken(token)) return ResponseEntity.status(401).body("Bad token");

        Optional<User> userOptional = Optional.ofNullable(jwtService.decodeToken(token));
        if(userOptional.isPresent()) {
            UserInfoResponse userInfo = new UserInfoResponse(userOptional.get().getUsername(), userOptional.get().getFirstName());
            return ResponseEntity.status(200).body(userInfo);
        }
        return ResponseEntity.status(403).body(null);
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

        if(tokenOptional.isPresent()) {
            String jwt = tokenOptional.get();
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(jwtService.decodeToken(jwt).getUserId());
            JWTResponse jwtResponse = new JWTResponse(jwt, refreshToken.getToken());
            return ResponseEntity.status(200).body(jwtResponse);
        }
        return ResponseEntity.status(403).body(null);
    } 

    @PostMapping("/auth/logout")
    public ResponseEntity logoutUser(@RequestHeader(name="Authorization") String token, @RequestBody String deadtoken) throws JsonProcessingException {
        if(!jwtService.validateToken(token)) return ResponseEntity.status(401).body("Bad token");

        Optional<Integer> userOptional = Optional.ofNullable(userService.logoutUser(token)); 

        if(userOptional.isPresent()) {
            refreshTokenService.deleteByUserId(userOptional.get());
            return ResponseEntity.status(200).body("Logged out");
        }
        return ResponseEntity.status(400).body(null);
    }

    @PostMapping("/auth/refresh")//for when a jwt token expires but the user hasn't logged out
    public ResponseEntity refreshToken(@RequestHeader(name="Authorization") String token, @RequestBody TokenRefreshRequest refreshToken) {
        
        String refreshTokenString = refreshToken.getRefreshToken();

        RefreshToken refreshTokenObject = refreshTokenService.findByToken(refreshTokenString).orElseThrow(() -> new RuntimeException("Refresh token " + refreshToken.getRefreshToken() + " is not in database!"));
        if(refreshTokenService.verifyExpiration(refreshTokenObject) != null){
            String newToken = jwtService.generateToken(refreshTokenObject.getUser());
            TokenRefreshResponse tokenRefreshResponse = new TokenRefreshResponse(newToken, refreshTokenString);
            return ResponseEntity.status(200).body(tokenRefreshResponse);   
        }
        return ResponseEntity.badRequest().build();
    }
}
