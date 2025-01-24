package com.example.ERS.service;

import org.springframework.stereotype.Service;

import com.example.ERS.entity.RefreshToken;
import com.example.ERS.entity.User;
import com.example.ERS.repository.RefreshTokenRepository;
import com.example.ERS.repository.UserRepository;

import java.util.Optional;
import java.util.UUID;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RefreshTokenService {//how do I determine when to refresh? Look into axios interceptors

    @Value("${jwt.refreshTokenExpirationMs}")
    private long refreshTokenExpirationMs;

    @Autowired
    @Lazy
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    @Lazy
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(int userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(userRepository.findById(userId).get());
        refreshToken.setExpiry_Date(new Date(System.currentTimeMillis() + refreshTokenExpirationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);

        System.out.println("Refresh token created");
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiry_Date().before(new Date(System.currentTimeMillis()))) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token " + token.getToken() + " is expired. Make a new sign-in request!");
        }
        return token;
    }

    @Transactional
    public int deleteByUserId(int userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return refreshTokenRepository.deleteByUser(userOptional.get());
    }
}
