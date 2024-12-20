package com.example.ERS.service;

import com.example.ERS.entity.User;
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
public class ReimbursementServiceImpl implements ReimbursementService {


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
        User user = userRepository.findById(reimbursement.getuserID()).get(); // make optional for null user

        if(!userRepository.existsById(reimbursement.getuserID()) || 
        reimbursement.getdescription().length() > 255 || 
        reimbursement.getamount() < 0 || jwtService.decodeToken(token) != user)  return null;

        return reimbursementRepository.save(reimbursement);
    }

    @Transactional
    public Reimbursement updateReimbursement(String token, int id, String status) {
        User user = jwtService.decodeToken(token); // make optional for null user/bad token

        Optional<Reimbursement> reimbursementOptional = reimbursementRepository.findById(id);
        if(reimbursementOptional.isPresent() &&
         (status.equals("Pending") || status.equals("Approved") || status.equals("Denied")) &&
          user.getRole().equals("Manager")) {
            Reimbursement reimbursement = reimbursementOptional.get();
            reimbursement.setstatus(status);
            return reimbursementRepository.save(reimbursement);
        } 
        return null;
    }

    @Transactional
    public List<Reimbursement> getAllReimbursements() {
        return reimbursementRepository.findAll();
    }

    @Transactional
    public List<Reimbursement> getAllPendingReimbursements() {
        return reimbursementRepository.findByStatus("Pending");
    }
}
