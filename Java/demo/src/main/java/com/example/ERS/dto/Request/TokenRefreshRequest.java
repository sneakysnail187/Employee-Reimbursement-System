package com.example.ERS.dto.Request;

import lombok.ToString;

@ToString
public class TokenRefreshRequest {

    private String refreshToken;

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
    
}
