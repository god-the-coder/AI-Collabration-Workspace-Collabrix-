import api from "./axios";


api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error)=> Promise.reject(error)
);

api.interceptors.response.use(
    (response)=> { 
        return response;
    },
    (error)=> Promise.reject(error)
);


