import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import dbConnect from "@/lib/db";
import Upload from "@/models/upload";

// Helper to get file extension/type
function getFileType(file: File): "pdf" | "docx" | "json" {
  if (file.type === "application/pdf") return "pdf";
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "docx";
  if (file.type === "application/json") return "json";
  // fallback: try extension
  if (file.name.endsWith(".pdf")) return "pdf";
  if (file.name.endsWith(".docx")) return "docx";
  if (file.name.endsWith(".json")) return "json";
  throw new Error("Unsupported file type");
}


export async function POST(req: NextRequest) {  
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    if (!userId) {
      return NextResponse.json({ error: "No userId provided" }, { status: 400 });
    }
    console.log("Received file:", file);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Optionally: Validate file size
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    // Upload to Vercel Blob
    const uniqueName = `uploads/${userId}-${Date.now()}-${file.name}`;
    const { url } = await put(uniqueName, file, {
      access: "public",
      addRandomSuffix: true,
    });
    console.log("Uploaded to Vercel Blob:", url);

    // Connect to MongoDB
    await dbConnect();
    console.log("Connected to MongoDB");

    // Save upload info to MongoDB
    const upload = await Upload.create({
      userId,
      fileUrl: url,
      originalName: file.name,
      fileType: getFileType(file),
      fileSize: file.size,
    });
    console.log("Saved to MongoDB:", upload);

    return NextResponse.json({ upload });
  } catch (err: unknown) {
    console.error("API error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "No userId provided" }, { status: 400 });
  }

  // Find uploads for this user, newest first
  const uploads = await Upload.find({ userId }).sort({ createdAt: -1 });

  return NextResponse.json({ uploads });
}