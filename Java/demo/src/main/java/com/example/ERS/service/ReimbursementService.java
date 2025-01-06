package com.example.ERS.service;

import com.example.ERS.entity.User;
import com.example.ERS.entity.Role;
import com.example.ERS.dto.Request.EditRequest;
import com.example.ERS.entity.Reimbursement;
import com.example.ERS.repository.UserRepository;
import com.example.ERS.repository.ReimbursementRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ReimbursementService {


    @Autowired
    @Lazy
    ReimbursementRepository reimbursementRepository;

    @Autowired
    @Lazy
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
    public Reimbursement updateReimbursement(String token, EditRequest reimbursement) {
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

    public List<Reimbursement> getUserReimbursements(String token, Integer id) {
        return new ArrayList<Reimbursement>(reimbursementRepository.findAllByUserID(jwtService.decodeToken(token)));
    }

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
