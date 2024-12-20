package com.example.ERS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ERS.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

    User findUserByUsername(String username);
}
