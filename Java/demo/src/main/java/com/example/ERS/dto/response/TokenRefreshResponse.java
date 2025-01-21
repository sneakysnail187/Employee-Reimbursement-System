package com.example.ERS.dto.response;

import lombok.Getter;
import lombok.Setter;

public class TokenRefreshResponse {
    private String token;
    private String refreshToken;

    public TokenRefreshResponse(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
}
