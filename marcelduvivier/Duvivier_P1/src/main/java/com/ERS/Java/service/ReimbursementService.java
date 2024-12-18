package com.ERS.Java.service;

import java.util.List;
import com.ERS.Java.entity.User;
import com.ERS.Java.entity.Reimbursement;

public interface ReimbursementService {
    Reimbursement createReimbursement(Reimbursement reimbursement);
    List<Reimbursement> getAllReimbursements(); //check role
    List<Reimbursement> getAllPendingReimbursements(); //check role
    Reimbursement updateReimbursement(int id, String status); //check role
}
