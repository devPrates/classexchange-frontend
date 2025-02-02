import { NextRequest, NextResponse } from "next/server";

export default function Middleware(request: NextRequest) {

    const authTokens = request.cookies.get("ClassExchange.token")?.value;

    if(authTokens) {
        return NextResponse.next();
    }else {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}

export const config = {
    matcher: '/dashboard', 
}