import axios, { AxiosInstance } from "axios";
import isJwtTokenExpired from 'jwt-check-expiry';

//add different instances for auth and protected
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    }
})

export const protectedInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

//attach an interceptor to automatically refresh JWT tokens on protected actions if they expire
protectedInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const initRequest = error.config;
        if (error.response?.status === 401 && !initRequest._retry) {
            initRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh");
                console.log("First token: " + localStorage.getItem("token"));
                const resp = await protectedInstance.post("/auth/refresh", { refreshToken }, { headers: { 'Authorization': localStorage.getItem("token") } });
                const { data } = resp;
                console.log("Response data: " + data);
                localStorage.setItem("token", data.token);
                initRequest.headers["Authorization"] = data.token;
                return axios(initRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export function addInterceptors(instance: any) {
    interface TokenRefreshResponse {
        token: string,
        refreshToken: string
    }
    const token = localStorage.getItem("token");
    if(token) console.log(isJwtTokenExpired(token));
    instance.interceptors.response.use(
        (response: any) => response,
        async (error: { config: any; response: { status?: number; }; }) => {
            const initRequest = error.config;
            console.log(error);
            if (error.response?.status === 401){// && !initRequest._retry) {
                //initRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem("refresh");
                    console.log("First token: " + localStorage.getItem("token"));
                    const resp = await instance.post("/auth/refresh", { refreshToken }, {headers: {'Authorization': localStorage.getItem("token")}});
                    const { data } = resp.data;
                    console.log("Response data: " + data);
                    localStorage.setItem("token", data.token);
                    initRequest.headers["Authorization"] = data.token;
                    return axios(initRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    );
}   

/*protectedInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const initRequest = error.config;
        if (error.response.status === 401 && !initRequest._retry) {
            initRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh");
                const resp = await axios.post("/auth/refresh", { refreshToken });
                const { data } = resp.data;
                localStorage.setItem("token", data.token);
                initRequest.headers["Authorization"] = data.token;
                return axios(initRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);*/

//export default protectedInstance
