import axios from "axios";

export const frontendApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api`,  // mudar para uma variavel de ambiente
    headers: {
        "Content-Type": "application/json"
    }
});

export const backendApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,   // mudar para uma variavel de ambiente
    headers: {
        "Content-Type": "application/json"
    }
});