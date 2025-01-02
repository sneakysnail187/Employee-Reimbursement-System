import axios from "axios";

//add different instances for different endpoints

export const loginInstance = axios.create({
    baseURL: import.meta.env.VITE_API_LOGIN,
    headers: {
        "Content-Type": "application/json",
    }
})

export const registerInstance = axios.create({
    baseURL: import.meta.env.VITE_API_REGISTER,
    headers: {
        "Content-Type": "application/json",
    }
})

export const addTicketInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ADD_TICKET,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

export const editTicketInstance = axios.create({
    baseURL: import.meta.env.VITE_API_EDIT_TICKET,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})