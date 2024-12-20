package com.example.ERS.entity;

import java.util.Set;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Table(name="roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String role;

    @OneToMany(mappedBy = "role")
    private Set<User> users;

    public Role(String role) {
        this.role = role;
    }
    
}
