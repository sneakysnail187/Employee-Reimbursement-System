package com.example.ERS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Lazy;

import com.example.ERS.entity.Role;
import com.example.ERS.service.RoleService;


@RestController
public class RoleController {

    @Autowired
    @Lazy
    private RoleService roleService;

    @PostMapping("/role")
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        Role newRole = roleService.createRole(role);
        if(newRole == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(newRole);
    }
    
}
