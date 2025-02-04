import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {

    const authToken = request.cookies.get("ClassExchange.token")?.value;

    if (authToken) {

        const isTokenValid = await validateToken(authToken);

        if (isTokenValid)
            return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/auth/login", request.url));

}

export const config = {
    matcher: ['/dashboard/:path*']
}

type BackendValidateTokenResponseType = {
    valid: boolean;
}

type BackendValidateTokenRequestType = {
    token: string;
}

async function validateToken(token: string) {

    var isValid = false;

    try {
        const response = await fetch("http://localhost:3000/api/auth/verifyToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token } as BackendValidateTokenRequestType)
        });

        const jsonResponse = await response.json() as BackendValidateTokenResponseType;

        isValid = jsonResponse.valid;

    } catch (e) {
        isValid = false;
    }

    return isValid;

}