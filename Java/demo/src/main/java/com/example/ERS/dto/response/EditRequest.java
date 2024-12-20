package com.example.ERS.dto.response;

public class EditRequest {
    

    private Integer reimbursementid;
    private String status;

   
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getReimbursementid() {
        return reimbursementid;
    }
    public void setReimbursementid(Integer reimbursementid) {
        this.reimbursementid = reimbursementid;
    }
}
