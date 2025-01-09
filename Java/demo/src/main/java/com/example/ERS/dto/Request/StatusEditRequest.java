package com.example.ERS.dto.Request;

public class StatusEditRequest {

    private String status;

   
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "StatusEditRequest [status=" + status + "]";
    }
}
