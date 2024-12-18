package com.ERS.Java.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ERS.Java.entity.Reimbursement;

@Repository
public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer>{

    List<Reimbursement> findByStatus(String string);
}