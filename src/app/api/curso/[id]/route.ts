import { backendApi } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest } from "next/server";

type DeleteCursoType = {
    params: {
        id: number
    }
};

type BackendResponseErrrorType = {
    timestamp: string;
    status: number;
    error: string;
    path: string
}

export async function DELETE(request: NextRequest, { params }: DeleteCursoType) {
    const authToken = request.cookies.get("ClassExchange.token")?.value;

    if (!authToken)
        return new Response(JSON.stringify(new Error("Usuário não autorizado")), { status: 401 });

    try {
        const url = `/api/cursos/${params.id}`;

        const result = await backendApi.delete(url, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        return new Response("", { status: 200 });

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