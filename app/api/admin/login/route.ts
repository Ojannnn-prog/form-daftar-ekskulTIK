import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USERNAME || "Admin";
    const validPass = process.env.ADMIN_PASSWORD || "231Sukaasih";

    if (username === validUser && password === validPass) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "authenticated_sdn231", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Username atau Password Admin salah!" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan sistem saat otentikasi." },
      { status: 500 }
    );
  }
}
