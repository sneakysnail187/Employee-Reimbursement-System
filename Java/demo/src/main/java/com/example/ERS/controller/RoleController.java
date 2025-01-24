package com.example.ERS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Lazy;

import com.example.ERS.entity.Role;
import com.example.ERS.service.JwtService;
import com.example.ERS.service.RoleService;

@RestController
public class RoleController {

    @Autowired
    @Lazy
    private RoleService roleService;

    @Autowired
    @Lazy
    JwtService jwtService;

    @PostMapping("/role")
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        Role newRole = roleService.createRole(role);
        if(newRole == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(newRole);
    }

    @GetMapping("/role")
    public ResponseEntity getRole(@RequestHeader(name="Authorization") String token) {
        if(!jwtService.validateToken(token)) return ResponseEntity.status(401).body("Bad token");
        Role role = roleService.getRole(token);
        if(role == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(role);
    }
    
}
