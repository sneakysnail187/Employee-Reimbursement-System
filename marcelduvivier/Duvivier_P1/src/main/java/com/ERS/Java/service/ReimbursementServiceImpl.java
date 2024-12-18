package com.ERS.Java.service;

import com.ERS.Java.entity.User;
import com.ERS.Java.entity.Reimbursement;
import com.ERS.Java.repository.UserRepository;
import com.ERS.Java.repository.ReimbursementRepository;
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

    public Reimbursement createReimbursement(Reimbursement reimbursement) {
        if(!userRepository.existsById(reimbursement.getuserID()) || reimbursement.getdescription().length() > 255 || reimbursement.getamount() < 0) return null;
        return reimbursementRepository.save(reimbursement);
    }

    public List<Reimbursement> getAllReimbursements() {
        return reimbursementRepository.findAll();
    }

    public List<Reimbursement> getAllPendingReimbursements() {
        return reimbursementRepository.findByStatus("Pending");
    }

    public Reimbursement updateReimbursement(int id, String status) {
        Optional<Reimbursement> reimbursementOptional = reimbursementRepository.findById(id);
        if(reimbursementOptional.isPresent() && !status.equals("") && status.equals("Pending") || status.equals("Approved") || status.equals("Denied")) {
            Reimbursement reimbursement = reimbursementOptional.get();
            reimbursement.setstatus(status);
            return reimbursementRepository.save(reimbursement);
        } 
        return null;
    }


    
}
