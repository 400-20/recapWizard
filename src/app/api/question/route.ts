import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  const { question, context } = await request.json()

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Given the following meeting transcription:

${context}

Please answer the following question:
${question}

Provide a concise and relevant answer based on the information in the transcription.`

    const result = await model.generateContent(prompt)
    const answer = result.response.text()

    return NextResponse.json({ answer })
  } catch (error) {
    console.error("Error generating answer:", error)
    return NextResponse.json({ error: "Failed to generate answer" }, { status: 500 })
  }
}

