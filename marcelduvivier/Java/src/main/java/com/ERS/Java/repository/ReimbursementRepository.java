package com.ERS.Java.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ERS.Java.entity.Reimbursement;

@Repository
public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer>{

    Reimbursement findReimbursementByUsername(String username);
}