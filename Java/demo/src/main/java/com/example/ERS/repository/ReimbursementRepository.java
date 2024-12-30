package com.example.ERS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.ERS.entity.Reimbursement;

@Repository
public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer>{

    List<Reimbursement> findAllByStatus(String string);

    @Query("SELECT r FROM Reimbursement r WHERE r.userID = ?1")
    List<Reimbursement> findAllByUserID(Integer id);

    @Query("SELECT r FROM Reimbursement r WHERE r.userID = ?1 AND r.status = ?2")
    List<Reimbursement> findAllByUserIDAndStatus(Integer id, String string);
}