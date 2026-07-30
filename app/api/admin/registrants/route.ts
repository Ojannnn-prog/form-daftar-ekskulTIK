import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search") || "";

    // Build filter condition
    const where: Prisma.RegistrantWhereInput = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { whatsapp: { contains: search } },
      ];
    }

    const registrants = await prisma.registrant.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { emailLogs: true },
        },
      },
    });

    // Compute stats
    const total = await prisma.registrant.count();
    const approved = await prisma.registrant.count({ where: { status: "APPROVED" } });
    const rejected = await prisma.registrant.count({ where: { status: "REJECTED" } });
    const pending = await prisma.registrant.count({ where: { status: "PENDING" } });

    // Get max quota setting (default 50 as requested by user)
    const quotaSetting = await prisma.setting.findUnique({
      where: { key: "max_quota" },
    });
    const maxQuota = quotaSetting ? parseInt(quotaSetting.value, 10) : 50;

    // Get WhatsApp Group link setting
    const waGroupSetting = await prisma.setting.findUnique({
      where: { key: "whatsapp_group_link" },
    });
    const waGroupLink = waGroupSetting
      ? waGroupSetting.value
      : "https://chat.whatsapp.com/SDN231SukaasihTIK";

    return NextResponse.json({
      success: true,
      data: {
        registrants,
        stats: {
          total,
          approved,
          rejected,
          pending,
          maxQuota,
        },
        settings: {
          maxQuota,
          waGroupLink,
        },
      },
    });
  } catch (error) {
    console.error("GET /api/admin/registrants error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pendaftar." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // If batch import array
    if (Array.isArray(body)) {
      const createManyData = body.map((item) => ({
        name: item.name || "Siswa Baru",
        email: item.email,
        whatsapp: item.whatsapp || "08000000000",
        reason: item.reason || "Imported dari CSV",
        status: item.status || "PENDING",
      }));

      const res = await prisma.registrant.createMany({
        data: createManyData,
        skipDuplicates: true,
      });

      return NextResponse.json({ success: true, count: res.count });
    }

    // Single add
    const registrant = await prisma.registrant.create({
      data: {
        name: body.name,
        email: body.email,
        whatsapp: body.whatsapp,
        reason: body.reason,
        status: body.status || "PENDING",
        notes: body.notes || null,
      },
    });

    return NextResponse.json({ success: true, data: registrant });
  } catch (error: unknown) {
    console.error("POST /api/admin/registrants error:", error);
    return NextResponse.json(
      { error: "Gagal menambahkan data pendaftar." },
      { status: 500 }
    );
  }
}
