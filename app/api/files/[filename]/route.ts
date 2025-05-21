// app/api/files/[filename]/route.tsx
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { readFile } from "fs/promises";
import mime from "mime-types";

export async function GET(
  _: NextRequest,

  { params }: { params: Promise<{ filename: string }> },
) {
  const filename = (await params).filename;

  const uploadDir = "public/uploads";

  const filePath = `${uploadDir}/${filename}`;

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  const bytes = await readFile(filePath);

  const mimeType = mime.lookup(filePath) || "application/octet-stream";

  // read file from file system
  return new NextResponse(bytes, {
    headers: { "Content-Type": mimeType },
  });
}
