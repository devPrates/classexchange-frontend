import { backendApi } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

type BackendResponseErrrorType = {
    timestamp: string;
    status: number;
    error: string;
    path: string
}


type InsertCampusRequestType = {
    name: string;
    sigla: string;
    endereco: string;
}

export async function POST(request: NextRequest) {
    const authToken = request.cookies.get("ClassExchange.token")?.value;

    if (!authToken) {
        return new Response(JSON.stringify(new Error("Usuário não autorizado")), { status: 401 });
    }

    try {

        const data = await request.json() as InsertCampusRequestType;
        const jsonData = JSON.stringify(data);

        const result = await backendApi.post("/api/campus", jsonData, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        })

        return new Response("", { status: 201 });
    } catch (e) {
        const axiosError = e as AxiosError;
        const { status, error } = axiosError.response?.data as BackendResponseErrrorType;

        if (status) {
            return new Response(JSON.stringify(new AxiosError(error, status.toString())), { status });
        } else {
            return new Response(JSON.stringify(new AxiosError(axiosError.message, axiosError.code)),
                { status: axiosError.status || 500 });
        }
    }
}

export type CampusType = {
    campusId: number
    name: string
    sigla: string
    endereco: string
}

export type listCampus = {
    campus: CampusType[]
}


export async function GET(request: NextRequest) {
    const authToken = request.cookies.get("ClassExchange.token")?.value;

    if (!authToken) {
        return new Response(JSON.stringify(new Error("Usuário não autorizado")), { status: 401 });
    }

    try {
        const result = await backendApi.get("/api/campus", {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            }
        })
        const campus = result.data as listCampus;

        return new Response(JSON.stringify(campus), { status: 200 });
    } catch (e) {
        const axiosError = e as AxiosError;
        const { status, error } = axiosError.response?.data as BackendResponseErrrorType;

        if (status) {
            return new Response(JSON.stringify(new AxiosError(error, status.toString())), { status });
        } else {
            return new Response(JSON.stringify(new AxiosError(axiosError.message, axiosError.code)),
                { status: axiosError.status || 500 });
        }
    }
}