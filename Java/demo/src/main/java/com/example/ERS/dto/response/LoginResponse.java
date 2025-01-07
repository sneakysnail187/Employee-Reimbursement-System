package com.example.ERS.dto.response;

import com.example.ERS.entity.Role;
public class LoginResponse {
    private String token;
    private Role role;

    public LoginResponse(String token, Role role) {
        this.token = token;
        this.role = role;
    }
}
