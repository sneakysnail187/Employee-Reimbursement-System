package com.example.ERS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ERS.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

    User findUserByUsername(String username);
}

//org.springframework.beans.factory.BeanCreationException: 
//Error creating bean with name 'dataSourceScriptDatabaseInitializer' defined in class path resource 
//[org/springframework/boot/autoconfigure/sql/init/DataSourceInitializationConfiguration.class]: 
//Failed to execute SQL script statement #1 of file [C:\Users\marcel\Documents\marcelduvivier\marcelduvivier\Duvivier_P1\target\classes\data.sql]: drop table if exists user
//Caused by: org.postgresql.util.PSQLException: ERROR: syntax error at or near "drop"
//LINE 1: drop table if exists user