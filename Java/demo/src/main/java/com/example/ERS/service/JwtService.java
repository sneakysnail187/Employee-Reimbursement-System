package com.example.ERS.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.ERS.entity.User;
import com.fasterxml.jackson.core.JsonProcessingException; 
import com.example.ERS.entity.Role;

import java.security.Key; 
import java.util.Date; 
import java.util.HashMap; 
import java.util.Map; 
  
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
    public String generateToken(User user){ 
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
                .setExpiration(new Date(System.currentTimeMillis() + 10000 * 60)) // 10 minutes
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

    public boolean validateToken(String token) {
        try {
            Jws<Claims> jwsClaims = Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
            Claims claims = jwsClaims.getBody();
            System.out.println(claims.getExpiration());
            System.out.println(claims.getId());
            return true;
        } catch (SecurityException ex) {
            // Invalid signature/claims
        } catch (ExpiredJwtException ex) {
            // Expired token
        } catch (UnsupportedJwtException ex) {
            // Unsupported JWT token
        } catch (MalformedJwtException ex) {
            // Malformed JWT token
        } catch (IllegalArgumentException ex) {
            // JWT token is empty
        }
        return false;
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
        return new Role(Jwts.parserBuilder()
        .setSigningKey(getSigningKey())
        .build()
        .parseClaimsJws(token)
        .getBody()
        .get("role", String.class));
    }

    public Date getExpirationDateFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }
    
    //dtos principal(returned to user), login request, reimbursement request

    public Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
