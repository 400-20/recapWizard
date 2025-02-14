import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { transcription } = await req.json()
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
        return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Summarize the following meeting transcription: ${transcription}`,
                            },
                        ],
                    },
                ],
            }),
        })

        const data = await response.json()
        const summary = data.candidates[0].content.parts[0].text

        return NextResponse.json({ summary })
    } catch (error) {
        console.error("Error calling Gemini API:", error)
        return NextResponse.json({ error: "Error generating summary" }, { status: 500 })
    }
}

