package com.example.ERS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.ERS.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

    User findUserByUsername(String username);
    
    @Modifying(flushAutomatically = true)
    @Query("DELETE FROM User u WHERE u.userId = :id")
    void deleteUser(@Param("id") Integer id);
}
