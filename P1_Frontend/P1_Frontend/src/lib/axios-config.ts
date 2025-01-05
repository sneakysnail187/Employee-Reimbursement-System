import axios from "axios";

//add different instances for different endpoints
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    }
})

