package com.example.ERS.service;

import com.example.ERS.entity.User;
import com.example.ERS.entity.Role;
import com.example.ERS.dto.Request.AmountEditRequest;
import com.example.ERS.dto.Request.DescriptionEditRequest;
import com.example.ERS.dto.Request.StatusEditRequest;
import com.example.ERS.entity.Reimbursement;
import com.example.ERS.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import com.example.ERS.repository.ReimbursementRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;


@Service
public class ReimbursementService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    ReimbursementRepository reimbursementRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    @Lazy
    JwtService jwtService;

    @Autowired
    @Lazy
    UserService userService;

    @Transactional
    public Reimbursement createReimbursement(String token, Reimbursement reimbursement) {
        int id = jwtService.getIdFromToken(token);
        Optional<User> userOptional = userRepository.findById(id);
        
        if(userOptional.isEmpty() || 
        reimbursement.getDescription().length() > 255 || 
        reimbursement.getAmount() < 0)  return null;

        reimbursement.setUserID(userOptional.get());
        reimbursement.setStatus("Pending");

        Reimbursement reimbursementSaved = reimbursementRepository.save(reimbursement);
        reimbursementRepository.flush();
        return reimbursementSaved;
    }

    @Transactional
    public Reimbursement updateReimbursementStatus(String token, Integer id, String statusJSON) throws JsonMappingException, JsonProcessingException {//verify perms from token later
        Optional<Reimbursement> reimbursementOptional = reimbursementRepository.findById(id);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(statusJSON);
        String status = node.get("status").asText();

        if(reimbursementOptional.isPresent() &&
         (status.equals("Pending") || status.equals("Approved") || status.equals("Denied"))) {
            Reimbursement reimbursementEdit = reimbursementOptional.get();
            reimbursementEdit.setStatus(status);
            reimbursementRepository.save(reimbursementEdit);
            reimbursementRepository.flush();
            return reimbursementEdit;
        } 
        return null;
    }

    @Transactional
    public Reimbursement updateReimbursementAmount(String token, Integer id, String amountJSON) throws JsonMappingException, JsonProcessingException {

        Optional<Reimbursement> reimbursementOptional = reimbursementRepository.findById(id);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(amountJSON);
        Double amount = node.get("amount").asDouble();
        
        if(reimbursementOptional.isPresent()) {
            Reimbursement reimbursementEdit = reimbursementOptional.get();
            reimbursementEdit.setAmount(amount);
            return reimbursementRepository.save(reimbursementEdit);
        } 
        return null;
    }

    @Transactional
    public Reimbursement updateReimbursementDescription(String token, Integer id, String descriptionJSON) throws JsonMappingException, JsonProcessingException {

        Optional<Reimbursement> reimbursementOptional = reimbursementRepository.findById(id);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(descriptionJSON);
        String description = node.get("status").asText();

        if(reimbursementOptional.isPresent()) {
            Reimbursement reimbursementEdit = reimbursementOptional.get();
            reimbursementEdit.setDescription(description);
            return reimbursementRepository.save(reimbursementEdit);
        } 
        return null;
    }

    public List<Reimbursement> getUserReimbursements(String token) {
        CopyOnWriteArrayList<Reimbursement> reimbursements = new CopyOnWriteArrayList<Reimbursement>(reimbursementRepository.findAllByUserID(jwtService.decodeToken(token)));
        reimbursements.forEach(entityManager::detach);
        return reimbursements;

    }

    public List<Reimbursement> getAllReimbursements(String token) { //verify perms from token later
        CopyOnWriteArrayList<Reimbursement> reimbursements = new CopyOnWriteArrayList<Reimbursement>(reimbursementRepository.findAll());
        reimbursements.forEach(entityManager::detach);
        return reimbursements;
    }

    public List<Reimbursement> getUserPendingReimbursements(String token, Integer id) {
        return new ArrayList<Reimbursement>(reimbursementRepository.findAllByUserIDAndStatus(id, "Pending"));
    }

    public List<Reimbursement> getAllPendingReimbursements(String token) {
        Role role = jwtService.getRoleFromToken(token);
        if(role.getRole().equals("Manager")) return new ArrayList<Reimbursement>(reimbursementRepository.findAllByStatus("Pending"));
        return null;
    }
}
