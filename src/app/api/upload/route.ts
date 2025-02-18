/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { getServerSession } from "next-auth/next"

import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: Request) {
  const session:any = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadsDir, { recursive: true })

    // Save file to disk
    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(uploadsDir, fileName)
    await writeFile(filePath, buffer)

    // Save recording info to database
    const client = await clientPromise
    const db = client.db()
    const recordingsCollection = db.collection("recordings")

    const recording = {
      userId: new ObjectId(session.user.id),
      fileName: fileName,
      originalName: file.name,
      path: `/uploads/${fileName}`,
      createdAt: new Date(),
    }

    const result = await recordingsCollection.insertOne(recording)

    return NextResponse.json({
      message: "File uploaded successfully",
      recordingId: result.insertedId,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

