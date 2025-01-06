package com.example.ERS.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.ERS.entity.Reimbursement;
import com.example.ERS.entity.User;

@Repository
public interface ReimbursementRepository extends JpaRepository<Reimbursement, Integer>{

    List<Reimbursement> findAllByStatus(String string);

    @Query("SELECT * FROM Reimbursement r WHERE r.userID = ?1")
    List<Reimbursement> findAllByUserID(User id);

    @Query("SELECT * FROM Reimbursement r WHERE r.userID = ?1 AND r.status = ?2")
    List<Reimbursement> findAllByUserIDAndStatus(Integer id, String string);
}