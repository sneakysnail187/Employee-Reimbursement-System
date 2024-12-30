package com.example.ERS.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.ERS.entity.Role;
import com.example.ERS.repository.RoleRepository;

@Service
public class RoleService {
    
    @Autowired
    RoleRepository roleRepository;


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

}
