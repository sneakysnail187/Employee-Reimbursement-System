package com.example.ERS.dto.response;

import com.example.ERS.entity.Reimbursement;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AllReimbursementResponse {
    //here also
    private Integer reimbursementId;
    private String description;
    private Double amount;
    private String status;
    private String username;


    public AllReimbursementResponse(Reimbursement r) {
        this.reimbursementId = r.getReimbursementId();
        this.description = r.getDescription();
        this.amount = r.getAmount();
        this.status = r.getStatus();
        this.username = r.getUserID().getUsername();
    }
}