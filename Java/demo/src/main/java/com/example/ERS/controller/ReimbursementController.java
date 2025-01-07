package com.example.ERS.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.Lazy;

import com.example.ERS.dto.Request.AmountEditRequest;
import com.example.ERS.dto.Request.DescriptionEditRequest;
import com.example.ERS.dto.Request.StatusEditRequest;
import com.example.ERS.dto.response.AllReimbursementResponse;
import com.example.ERS.entity.Reimbursement;
import com.example.ERS.service.ReimbursementService;

import jakarta.transaction.Transactional;

import com.example.ERS.service.JwtService;

@RestController
public class ReimbursementController {

    @Autowired
    private ReimbursementService reimbursementService;

    @Autowired
    JwtService jwtService;
    @Transactional
    @PostMapping("/reimbursement")
    public ResponseEntity createTicket(@RequestHeader(name="Authorization") String token, @RequestBody Reimbursement ticket) {

        Optional<Reimbursement> reimbursementOptional = Optional.ofNullable(reimbursementService.createReimbursement(token, ticket));

        if(reimbursementOptional.isPresent()) { 
            return ResponseEntity.status(200).body(reimbursementOptional.get());
        }
        return ResponseEntity.status(401).body(null);
    }
    //set status automatically not in postman

    @Transactional
    @PatchMapping("/reimbursement/status")
    public ResponseEntity editTicketStatus(@RequestHeader(name="Authorization") String token, @RequestBody StatusEditRequest ticket) {

        Optional<Reimbursement> reimbursementOptional = Optional.ofNullable(reimbursementService.updateReimbursementStatus(token, ticket));
        if(reimbursementOptional.isPresent()) { 
            return ResponseEntity.status(200).body(reimbursementOptional.get());
        }
        return ResponseEntity.status(401).body(null);
    }

    @Transactional
    @PatchMapping("/reimbursement/amount")
    public ResponseEntity editTicketAmount(@RequestHeader(name="Authorization") String token, @RequestBody AmountEditRequest ticket) {

        Optional<Reimbursement> reimbursementOptional = Optional.ofNullable(reimbursementService.updateReimbursementAmount(token, ticket));
        if(reimbursementOptional.isPresent()) { 
            return ResponseEntity.status(200).body(reimbursementOptional.get());
        }
        return ResponseEntity.status(401).body(null);
    }

    @Transactional
    @PatchMapping("/reimbursement/description")
    public ResponseEntity editTicketDescription(@RequestHeader(name="Authorization") String token, @RequestBody DescriptionEditRequest ticket) {

        Optional<Reimbursement> reimbursementOptional = Optional.ofNullable(reimbursementService.updateReimbursementDescription  (token, ticket));
        if(reimbursementOptional.isPresent()) { 
            return ResponseEntity.status(200).body(reimbursementOptional.get());
        }
        return ResponseEntity.status(401).body(null);
    }

    @GetMapping("/users/reimbursements")//take the status from uri param later
    public ResponseEntity getUserTickets(@RequestHeader(name="Authorization") String token) {
        List<Reimbursement> reimbursements = reimbursementService.getUserReimbursements(token);

        if (!reimbursements.isEmpty()) { 
            return ResponseEntity.status(200).body(reimbursements);
        }
        return ResponseEntity.status(401).body(null);
    }

    @GetMapping("/reimbursements/all")//take the status from uri param later
    public ResponseEntity getAllTickets(@RequestHeader(name="Authorization") String token) {
        List<Reimbursement> reimbursementsOptional = reimbursementService.getAllReimbursements(token);

        if(!reimbursementsOptional.isEmpty()) { //find a better way to do this
            List<AllReimbursementResponse> responses = new ArrayList<>(reimbursementsOptional.stream().map(AllReimbursementResponse::new).collect(Collectors.toList()));
            return ResponseEntity.status(200).body(responses);
        }
        return ResponseEntity.status(401).body(null);
    }

    @GetMapping("/users/reimbursements?status=pending")//take the status from uri param later
    public ResponseEntity getUserPendingTickets(@RequestHeader(name="Authorization") String token) {

        int id = jwtService.getIdFromToken(token);
        List<Reimbursement> reimbursementsOptional = reimbursementService.getUserPendingReimbursements(token, id);

        if(reimbursementsOptional != null) { //find a better way to do this
            return ResponseEntity.status(200).body(reimbursementsOptional.toString());
        }
        return ResponseEntity.status(401).body(null);
    }

    @GetMapping("/reimbursements?status=pending")//take the status from uri param later
    public ResponseEntity getAllPendingTickets(@RequestHeader(name="Authorization") String token) {

        List<Reimbursement> reimbursementsOptional = reimbursementService.getAllReimbursements(token);

        if(reimbursementsOptional != null) { //find a better way to do this
            return ResponseEntity.status(200).body(reimbursementsOptional.toString());
        }
        return ResponseEntity.status(401).body(null);
    }

}
