package com.example.ERS.service;

import java.util.List;
import com.example.ERS.entity.User;
import com.example.ERS.entity.Reimbursement;

public interface ReimbursementService {
    Reimbursement createReimbursement(Reimbursement reimbursement);
    List<Reimbursement> getAllReimbursements(); //check role
    List<Reimbursement> getAllPendingReimbursements(); //check role
    Reimbursement updateReimbursement(int id, String status); //check role
}
