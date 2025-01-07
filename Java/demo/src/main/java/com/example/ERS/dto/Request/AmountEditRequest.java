package com.example.ERS.dto.Request;

public class AmountEditRequest {
    

    private Integer reimbursementid;
    private Double amount;

    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Integer getReimbursementid() {
        return reimbursementid;
    }
    public void setReimbursementid(Integer reimbursementid) {
        this.reimbursementid = reimbursementid;
    }
}
