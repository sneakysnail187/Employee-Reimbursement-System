package com.example.ERS.service;

import com.example.ERS.entity.User;
import com.example.ERS.entity.Role;
import com.example.ERS.dto.Request.AmountEditRequest;
import com.example.ERS.dto.Request.DescriptionEditRequest;
import com.example.ERS.dto.Request.StatusEditRequest;
import com.example.ERS.entity.Reimbursement;
import com.example.ERS.repository.UserRepository;

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
    public Reimbursement updateReimbursementStatus(String token, StatusEditRequest reimbursement) {
        Role role = jwtService.getRoleFromToken(token);
        String status = reimbursement.getStatus();

        Optional<Reimbursement> reimbursementOptional = reimbursementRepository.findById(reimbursement.getReimbursementid());
        if(reimbursementOptional.isPresent() &&
         (status.equals("Pending") || status.equals("Approved") || status.equals("Denied")) &&
          role.getRole().equals("Manager")) {
            Reimbursement reimbursementEdit = reimbursementOptional.get();
            reimbursementEdit.setStatus(status);
            return reimbursementRepository.save(reimbursementEdit);
        } 
        return null;
    }

    @Transactional
    public Reimbursement updateReimbursementAmount(String token, AmountEditRequest reimbursement) {

        Optional<Reimbursement> reimbursementOptional = reimbursementRepository.findById(reimbursement.getReimbursementid());
        if(reimbursementOptional.isPresent()) {
            Reimbursement reimbursementEdit = reimbursementOptional.get();
            reimbursementEdit.setAmount(null);//get this
            return reimbursementRepository.save(reimbursementEdit);
        } 
        return null;
    }

    @Transactional
    public Reimbursement updateReimbursementDescription(String token, DescriptionEditRequest reimbursement) {

        Optional<Reimbursement> reimbursementOptional = reimbursementRepository.findById(reimbursement.getReimbursementid());
        if(reimbursementOptional.isPresent()) {
            Reimbursement reimbursementEdit = reimbursementOptional.get();
            reimbursementEdit.setDescription(null);//get this
            return reimbursementRepository.save(reimbursementEdit);
        } 
        return null;
    }

    public List<Reimbursement> getUserReimbursements(String token) {
        CopyOnWriteArrayList<Reimbursement> reimbursements = new CopyOnWriteArrayList<Reimbursement>(reimbursementRepository.findAllByUserID(jwtService.decodeToken(token)));
        reimbursements.forEach(entityManager::detach);
        return reimbursements;

    }

    @Transactional
    public List<Reimbursement> getUserPendingReimbursements(String token, Integer id) {
        return new ArrayList<Reimbursement>(reimbursementRepository.findAllByUserIDAndStatus(id, "Pending"));
    }

    public List<Reimbursement> getAllReimbursements(String token) {
        Role role = jwtService.getRoleFromToken(token);
        if(role.getRole().equals("Manager")) return new ArrayList<Reimbursement>(reimbursementRepository.findAll());
        return null;
    }

    public List<Reimbursement> getAllPendingReimbursements(String token) {
        Role role = jwtService.getRoleFromToken(token);
        if(role.getRole().equals("Manager")) return new ArrayList<Reimbursement>(reimbursementRepository.findAllByStatus("Pending"));
        return null;
    }
}
