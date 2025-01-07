package com.example.ERS.dto.Request;

public class DescriptionEditRequest {
    

    private Integer reimbursementid;
    private String description;

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getReimbursementid() {
        return reimbursementid;
    }
    public void setReimbursementid(Integer reimbursementid) {
        this.reimbursementid = reimbursementid;
    }
}
