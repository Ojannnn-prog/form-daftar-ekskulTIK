import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || (status !== "APPROVED" && status !== "REJECTED")) {
      return NextResponse.json(
        { error: "Parameter ID atau status tidak valid." },
        { status: 400 }
      );
    }

    // 1. Find Registrant
    const registrant = await prisma.registrant.findUnique({
      where: { id },
    });

    if (!registrant) {
      return NextResponse.json(
        { error: "Data pendaftar tidak ditemukan." },
        { status: 404 }
      );
    }

    // 2. Update status in Database directly (no email sending)
    const updated = await prisma.registrant.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: unknown) {
    console.error("POST /api/admin/approve error:", error);
    return NextResponse.json(
      { error: "Gagal memproses konfirmasi status pendaftar." },
      { status: 500 }
    );
  }
}
