package com.example.ERS.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Lazy;

import com.example.ERS.dto.Request.EditRequest;
import com.example.ERS.entity.Reimbursement;
import com.example.ERS.service.ReimbursementService;
import com.example.ERS.service.JwtService;


@RestController
public class ReimbursementController {

    @Autowired
    @Lazy
    private ReimbursementService reimbursementService;

    @Autowired
    JwtService jwtService;

    @PostMapping("/reimbursement")
    public ResponseEntity createTicket(@RequestHeader(name="authorization") String token, @RequestBody Reimbursement ticket) {

        Optional<Reimbursement> reimbursementOptional = Optional.ofNullable(reimbursementService.createReimbursement(token, ticket));

        if(reimbursementOptional.isPresent()) { 
            return ResponseEntity.status(200).body(reimbursementOptional.toString());
        }
        return ResponseEntity.status(401).body(null);
    }
    //set status automatically not in postman

    @PatchMapping("/reimbursement/edit")
    public ResponseEntity editTicket(@RequestHeader(name="authorization") String token, @RequestBody EditRequest ticket) {

        Optional<Reimbursement> reimbursementOptional = Optional.ofNullable(reimbursementService.updateReimbursement(token, ticket));
        if(reimbursementOptional.isPresent()) { 
            return ResponseEntity.status(200).body(reimbursementOptional.get().toString());
        }
        return ResponseEntity.status(401).body(null);
    }
}
