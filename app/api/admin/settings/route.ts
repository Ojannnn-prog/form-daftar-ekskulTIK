import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settingsList = await prisma.setting.findMany();
    const settingsMap: Record<string, string> = {};

    for (const item of settingsList) {
      settingsMap[item.key] = item.value;
    }

    return NextResponse.json({
      success: true,
      data: {
        whatsapp_group_link:
          settingsMap["whatsapp_group_link"] ||
          "https://chat.whatsapp.com/SDN231SukaasihTIK",
        max_quota: settingsMap["max_quota"] || "50",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil konfigurasi sistem." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { whatsapp_group_link, max_quota } = await request.json();

    if (whatsapp_group_link) {
      await prisma.setting.upsert({
        where: { key: "whatsapp_group_link" },
        update: { value: whatsapp_group_link },
        create: { key: "whatsapp_group_link", value: whatsapp_group_link },
      });
    }

    if (max_quota) {
      await prisma.setting.upsert({
        where: { key: "max_quota" },
        update: { value: max_quota.toString() },
        create: { key: "max_quota", value: max_quota.toString() },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menyimpan konfigurasi sistem." },
      { status: 500 }
    );
  }
}
