import { backendApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";

export type LoginResponseType = {
    accessToken?: string;
    expiresIn: number;
    error?: string;
};

type BackendLoginResponseType = {
    accessToken: string;
    expiresIn: number;

};

type BackendLoginErrorResponseType = {
    timestamp: string;
    status: number;
    error: string;
    path: string;
}

export async function POST(request: NextRequest) {

    const { email, password } = await request.json();

    const data = JSON.stringify({ email, password });

    var response: LoginResponseType;

    try {

        const result = await backendApi.post("/login", data);
        const { accessToken, expiresIn  } = result.data;
        response = { accessToken, expiresIn };

    } catch (e) {
        const axiosError = e as AxiosError;

        const { status, error } = axiosError.response?.data as BackendLoginErrorResponseType;

        if (status) {
            response = { error, expiresIn: 0 };
        }
        else {
            response = { error: axiosError.message, expiresIn: 0 };
        }
    }

    console.log(response);

    return new Response(JSON.stringify(response))
}