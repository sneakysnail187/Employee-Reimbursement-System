package com.example.ERS.dto.response;

import java.time.OffsetDateTime;

import com.example.ERS.entity.Reimbursement;

public class ReimbursementResponse {
    private Integer reimbursementId;
    private String description;
    private Double amount;
    private String status;
    private String project;
    private OffsetDateTime submitted;

    public ReimbursementResponse(Reimbursement r) {
        this.reimbursementId = r.getReimbursementId();
        this.description = r.getDescription();
        this.amount = r.getAmount();
        this.status = r.getStatus();
        this.project = r.getProject();
        this.submitted = r.getSubmitted();
    }
}
