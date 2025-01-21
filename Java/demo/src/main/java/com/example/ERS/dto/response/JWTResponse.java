package com.example.ERS.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JWTResponse {
    private String token;
    private String refreshToken;

    public JWTResponse(String token, String refreshToken) {
        this.token = token;
        this.refreshToken = refreshToken;
    }
    
}
