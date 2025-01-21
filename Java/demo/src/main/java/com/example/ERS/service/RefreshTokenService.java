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
import org.springframework.transaction.annotation.Transactional;

@Service
public class RefreshTokenService {

    @Value("${jwt.refreshTokenExpirationMs}")
    private long refreshTokenExpirationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(int userId) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(userRepository.findById(userId).get());
        refreshToken.setExpiryDate(new Date(System.currentTimeMillis() + refreshTokenExpirationMs));
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().before(new Date(System.currentTimeMillis()))) {
            refreshTokenRepository.delete(token);
            return null;
        }
        return token;
    }

    @Transactional
    public int deleteByUserId(int userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        return refreshTokenRepository.deleteByUser(userOptional.get());
    }
}
