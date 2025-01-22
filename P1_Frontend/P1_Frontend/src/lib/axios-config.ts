import axios from "axios";

//add different instances for auth and protected
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    }
})

export const protectedInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
        'Authorization': localStorage.getItem("token")
    }
})

