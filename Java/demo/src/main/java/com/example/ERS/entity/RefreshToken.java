package com.example.ERS.entity;

import java.util.Date;
import lombok.Getter;    
import lombok.Setter;
import jakarta.persistence.*;

@Getter
@Setter
@Table(name = "refresh_token")
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    private User user;

    private String token;

    private Date expiryDate;
}
