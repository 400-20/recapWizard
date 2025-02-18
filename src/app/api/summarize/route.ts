import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  const { transcription } = await request.json()

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Summarize the following meeting transcription, highlighting key points, action items, and decisions made. Include timestamps and speaker information where possible. Format the summary in Markdown with the following sections:

1. Meeting Overview
2. Key Points (with timestamps)
3. Action Items
4. Decisions Made
5. Next Steps

Here's the transcription:

${transcription}

Please provide a professional and detailed summary.`

    const result = await model.generateContent(prompt)
    const summary = result.response.text()

    return NextResponse.json({ summary })
  } catch (error) {
    console.error("Error generating summary:", error)
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 })
  }
}

