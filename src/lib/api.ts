import axios from "axios";

export const frontendApi = axios.create({
    baseURL: "http://localhost:3000/api",  // mudar para uma variavel de ambiente
    headers: {
        "Content-Type": "application/json"
    }
});

export const backendApi = axios.create({
    baseURL: "http://localhost:8080",   // mudar para uma variavel de ambiente
    headers: {
        "Content-Type": "application/json"
    }
});