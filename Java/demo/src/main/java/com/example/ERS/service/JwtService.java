package com.example.ERS.service;

import io.jsonwebtoken.Claims; 
import io.jsonwebtoken.Jwts; 
import io.jsonwebtoken.SignatureAlgorithm; 
import io.jsonwebtoken.io.Decoders; 
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.ERS.entity.User;
import com.fasterxml.jackson.core.JsonProcessingException; 
import com.example.ERS.entity.Role;

import java.io.Console;
import java.security.Key; 
import java.util.Date; 
import java.util.HashMap; 
import java.util.Map; 
import java.util.function.Function; 
  
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    /**
     * Generates a JWT token for the specified user.
     *
     * @param user the user for whom the token is to be generated
     * @return a JWT token as a String
     * @throws JsonProcessingException 
     */
    public String generateToken(User user) throws JsonProcessingException { 
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getUserId());
        claims.put("username", user.getUsername());
        claims.put("password", user.getPassword());
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());
        claims.put("role", user.getRoleId().getRole()); 
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15)) // 15 minutes
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Decodes the given JWT token and retrieves the subject (email) from it.
     *
     * @param token the JWT token to decode
     * @return the subject (email) contained in the token
     * @throws io.jsonwebtoken.JwtException if the token is invalid or expired
     */
    public User decodeToken(String token) {
        var claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        User user = new User();
        user.setUserId(claims.get("id", Integer.class));
        user.setUsername(claims.get("username", String.class));
        user.setPassword(claims.get("password", String.class));
        user.setFirstName(claims.get("firstName", String.class));
        user.setLastName(claims.get("lastName", String.class));
        user.setRoleId(new Role(claims.get("role", String.class)));

        return user;
    }
    
    public Integer getIdFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("id", Integer.class);
    }

    public Role getRoleFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", Role.class);
    }
    
    //dtos principal(returned to user), login request, reimbursement request

    public Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}