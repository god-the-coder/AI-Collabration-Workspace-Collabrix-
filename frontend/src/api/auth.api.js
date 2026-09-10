import api from "./axios";


export const register = (data) => 
    api.post("v1/auth/register/", data);

export const login = (data) => 
    api.post("v1/auth/login/", data);

export const getCurrentUserAPI = () => {
    return api.get("v1/profiles/me/");
}

export const logout = () =>
    api.post("v1/auth/logout/");
