package com.example.ERS.service;

import java.util.List;
import com.example.ERS.entity.User;
import com.example.ERS.entity.Reimbursement;

public interface UserService {

    User registerUser(User user);
    String loginUser(String username, String password);


    //add JWT/session for authentication

    //add additional methods in implementation
    //non logged user has just these 2
    //logged user adds 
    //create reimbursement
    //get my reimbursements
    //get my pending reimbursements
    //add another functionality later

    //manager user is child of logged user (also implements base user interface)
    //can view all reimbursements
    //can view all pending reimbursements
    //can resolve reimbursements
    //can view all users
    //can delete users (this should cascade delete their reimbursements)
}
