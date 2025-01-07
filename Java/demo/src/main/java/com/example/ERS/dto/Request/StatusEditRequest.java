package com.example.ERS.dto.Request;

public class StatusEditRequest {
    

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
