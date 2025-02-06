import { backendApi } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

type BackendResponseErrrorType = {
    timestamp: string;
    status: number;
    error: string;
    path: string
}


type InsertCursoRequestType = {
    name: string
    sigla: string
    campusId: number
}

export async function POST(request: NextRequest) {
    const authToken = request.cookies.get("ClassExchange.token")?.value;

    if (!authToken) {
        return new Response(JSON.stringify(new Error("Usuário não autorizado")), { status: 401 });
    }

    try {

        const data = await request.json() as InsertCursoRequestType;
        const jsonData = JSON.stringify(data);

        const result = await backendApi.post("/api/cursos", jsonData, {
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

export type CursoType = {
    cursoId: number
    name: string
    sigla: string
    campusName: string
}

export type listCampus = {
    campus: CursoType[]
}


export async function GET(request: NextRequest) {
    const authToken = request.cookies.get("ClassExchange.token")?.value;

    if (!authToken) {
        return new Response(JSON.stringify(new Error("Usuário não autorizado")), { status: 401 });
    }

    try {
        const result = await backendApi.get("/api/cursos", {
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