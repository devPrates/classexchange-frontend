import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {

    const authToken = request.cookies.get("ClassExchange.token")?.value;
}

