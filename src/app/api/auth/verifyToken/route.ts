import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const publicKey = process.env.PUBLIC_KEY?.replace(/\\n/g, "\n") || "";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { valid: false, message: "Token is required" },
        { status: 400 }
      );
    }

    jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}
