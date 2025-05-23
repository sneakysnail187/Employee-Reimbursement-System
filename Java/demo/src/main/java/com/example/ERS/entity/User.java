package com.example.ERS.entity;

import java.util.List;

import org.hibernate.annotations.Cascade;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
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
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JoinColumn(name = "roleId", nullable = false)
    @JsonBackReference
    private Role roleId;

    @OneToMany(mappedBy = "userID", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonManagedReference
    private List<Reimbursement> reimbursements;

    public User (String firstName, String lastName, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }

    public User (User user) {
        this.userId = user.getUserId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.username = user.getUsername();
        this.password = user.getPassword();
    }
}
