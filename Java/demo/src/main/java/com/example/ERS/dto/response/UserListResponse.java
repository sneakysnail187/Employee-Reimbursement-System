package com.example.ERS.dto.response;

import lombok.Getter;
import lombok.Setter;
import com.example.ERS.entity.User;


@Getter
@Setter
public class UserListResponse {
    
    private Integer userId;
    private String fullName;
    private String username;
    private String role;

    public UserListResponse(User u) {
        this.userId = u.getUserId();
        this.fullName = u.getFirstName() + " " + u.getLastName();
        this.username = u.getUsername();
        this.role = u.getRoleId().getRole();
    }
}
