package com.ERS.Java.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ERS.Java.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

    User findUserByUsername(String username);
}