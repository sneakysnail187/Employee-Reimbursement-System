import axios from "axios";
import isJwtTokenExpired, { decode } from 'jwt-check-expiry';
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

export function addInterceptors(instance: any) {
    const token = localStorage.getItem("token");
    if(token) console.log(isJwtTokenExpired(token));
    instance.interceptors.response.use(
        (response: any) => response,
        async (error: { config: any; response: { status: number; }; }) => {
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
