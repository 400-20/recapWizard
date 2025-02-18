"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import { useChat } from "ai/react"
import { toast, Toaster } from "react-hot-toast"
import { useSession } from "next-auth/react"

export default function UploadRecording() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [summary, setSummary] = useState("")
  const [recordingId, setRecordingId] = useState<string | null>(null)
  console.log(recordingId);
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: session } = useSession()

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/question",
    body: { context: transcription },
  })




  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || !session) return

    setIsUploading(true)
    setTranscription("") // Reset previous transcription

    try {
      const formData = new FormData()
      formData.append("file", file)

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file")
      }

      const uploadData = await uploadResponse.json()
      setRecordingId(uploadData.recordingId)
      toast.success("Upload complete! Starting transcription...")

      // Start transcription process
      await handleTranscription(uploadData.recordingId)
    } catch (error) {
      console.error("Error processing file:", error)
      toast.error("Failed to process file. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleTranscription = async (recordingId: string) => {
    setIsTranscribing(true)

    try {
      const transcribeResponse = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordingId }),
      })

      if (!transcribeResponse.ok) {
        throw new Error("Failed to transcribe audio")
      }

      const transcribeData = await transcribeResponse.json()
      setTranscription(transcribeData.transcription)
      toast.success("Transcription complete!")

      // Generate summary after transcription
      await handleSummarize(transcribeData.transcription)
    } catch (error) {
      console.error("Error transcribing audio:", error)
      toast.error("Failed to transcribe. Please try again.")
    } finally {
      setIsTranscribing(false)
    }
  }

  const handleSummarize = async (text: string) => {
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcription: text }),
      })

      if (!response.ok) throw new Error("Failed to generate summary")

      const data = await response.json()
      setSummary(data.summary)
      toast.success("Summary generated")
    } catch (error) {
      console.error("Error summarizing transcription:", error)
      toast.error("Failed to generate summary. Please try again.")
    }
  }

  if (!session) {
    return <div>Please sign in to upload recordings.</div>
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Upload Recording</h1>
      <div className="space-y-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />

        {file && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpload}
            disabled={isUploading || isTranscribing}
            className={`w-full px-4 py-2 rounded-md transition-colors 
              ${isUploading || isTranscribing ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          >
            {isUploading ? "Uploading..." : isTranscribing ? "Transcribing..." : "Process Recording"}
          </motion.button>
        )}

        {isTranscribing && (
          <p className="text-center text-blue-600">⏳ Transcribing in real-time... Please wait</p>
        )}

        {transcription && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
            <p className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{transcription}</p>
          </div>
        )}

        {summary && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Summary:</h2>
            <div className="bg-gray-100 p-4 rounded">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-2">Ask a question about the recording:</h2>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your question"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              Ask
            </motion.button>
          </form>
          {messages.length > 0 && (
            <div className="mt-4 space-y-2">
              {messages.map((message, index) => (
                <div key={index} className={`p-2 rounded ${message.role === "user" ? "bg-blue-100" : "bg-green-100"}`}>
                  <strong>{message.role === "user" ? "You:" : "AI:"}</strong> {message.content}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  )
}
