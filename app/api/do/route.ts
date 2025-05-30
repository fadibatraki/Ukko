import { NextResponse } from "next/server";
import { authClient } from "@/lib/auth/client";

export async function GET() {
  await authClient.signUp.email({
    email: "ukko@admin.com",
    password: "Ukko.,.,123Ukko.,.,123",
    name: "Admin",
  });
  return NextResponse.json({ message: "did it successfully!" });
}
