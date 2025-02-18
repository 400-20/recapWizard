import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  const session = await getServerSession()

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const client = await clientPromise
    const db = client.db()
    const recordingsCollection = db.collection("recordings")

    const user = await db.collection("users").findOne({ email: session.user.email })
    if (!user || !user._id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    const recordings = await recordingsCollection
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(recordings)
  } catch (error) {
    console.error("Error fetching recordings:", error)
    return NextResponse.json({ error: "Failed to fetch recordings" }, { status: 500 })
  }
}

