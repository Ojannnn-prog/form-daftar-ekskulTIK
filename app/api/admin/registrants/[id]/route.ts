import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const registrant = await prisma.registrant.findUnique({
      where: { id },
      include: {
        emailLogs: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!registrant) {
      return NextResponse.json({ error: "Data pendaftar tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: registrant });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil detail pendaftar." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await prisma.registrant.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        whatsapp: body.whatsapp,
        reason: body.reason,
        status: body.status,
        notes: body.notes,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengupdate data pendaftar." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.registrant.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus data pendaftar." },
      { status: 500 }
    );
  }
}
