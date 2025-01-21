package com.example.ERS.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResponse {
    private String username;
    private String firstName;

    public UserInfoResponse(String username, String name) {
        this.username = username;
        this.firstName = name;
    }
}