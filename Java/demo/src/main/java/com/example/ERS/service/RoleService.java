package com.example.ERS.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import com.example.ERS.entity.Role;
import com.example.ERS.repository.RoleRepository;

@Service
public class RoleService {
    
    @Autowired
    @Lazy
    RoleRepository roleRepository;

    @Autowired
    @Lazy
    JwtService jwtService;


    @Transactional
    public Role createRole(Role role) {
        Optional<Role> existingRole = Optional.ofNullable(roleRepository.findByRole(role.getRole()));
        if (existingRole.isPresent()) {
            return null;
        }

        Role createdRole = roleRepository.save(role);
        roleRepository.flush();
        return createdRole;
    }

    public Role getRole(String token) {
        Role role = jwtService.getRoleFromToken(token);
        return role;
    }

}
