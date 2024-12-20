package com.example.ERS.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.example.ERS.entity.Role;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "users")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer userId;
    private String firstName;
    private String lastName;
    private String username;
    private String password;

    @ManyToOne()
    @JoinColumn(name = "role")
    private Role role;

    @OneToMany(mappedBy = "userID", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Reimbursement> reimbursements;

    public User (String firstName, String lastName, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }

   
    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

}
