// app/api/login/route.ts
import { NextResponse } from "next/server";
import { createToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Replace this with your actual authentication logic
    // This is just an example - in reality, you'd check against your database
    if (email === "admin@example.com" && password === "password") {
      const token = await createToken({ email });

      const response = NextResponse.json({ success: true }, { status: 200 });

      // Set the auth token as an HTTP-only cookie
      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
