import api from "../../api/axios";
import {ENDPOINTS} from "../../api/endpoints";
 

export const login = async (credentials) => {
    const response = await api.post(
        ENDPOINTS.AUTH.LOGIN,
        credentials
    );

    return response.data;
};

export const logout = async () => {
    const response = await api.post(
        ENDPOINTS.AUTH.LOGOUT
    );

    return response.data;
}

export const getProfile = async () => {
    const response = await api.get(
        ENDPOINTS.AUTH.PROFILE
    );

    return response.data;
};