import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

const registerSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().optional().default("-"),
  whatsapp: z.string().min(10).max(20),
  reason: z.string().min(5).max(1000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validated = registerSchema.parse(body);

    // Check if WhatsApp already registered and pending
    const existing = await prisma.registrant.findFirst({
      where: {
        whatsapp: validated.whatsapp,
        status: "PENDING",
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          error:
            "Nomor WhatsApp ini sudah memiliki pendaftaran yang sedang menunggu seleksi.",
        },
        { status: 400 }
      );
    }

    const registrant = await prisma.registrant.create({
      data: {
        name: validated.name,
        email: validated.email,
        whatsapp: validated.whatsapp,
        reason: validated.reason,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: registrant,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating registration:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Data yang dimasukkan tidak valid.", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan sistem saat menyimpan pendaftaran." },
      { status: 500 }
    );
  }
}
