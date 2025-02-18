/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import LoadingSpinner from "@/components/LoadingSpinner"
import ErrorBoundary from "@/components/ErrorBoundary"
// import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from "web-speech-api"

export default function RecordMeeting() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [summary, setSummary] = useState("")
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [isAsking, setIsAsking] = useState(false)
  const [error, setError] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const recognitionRef = useRef<any>(null)
  const transcriptRef = useRef<string>("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition:any = window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        setError("Speech recognition is not supported in this browser.")
        return
      }

      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " "
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }

        transcriptRef.current += finalTranscript
        setTranscription(transcriptRef.current + interimTranscript)
      }

      recognitionRef.current.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`)
      }
    }
  }, [])

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsRecording(true)
      setError("")
      transcriptRef.current = ""
      setTranscription("")
    } else {
      setError("Speech recognition is not supported in this browser.")
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
      setShowConfirmDialog(false)
    }
  }

  const handleSummarize = async () => {
    if (transcription) {
      setIsSummarizing(true)
      setError("")
      try {
        const response = await fetch("/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transcription }),
        })

        if (!response.ok) {
          throw new Error("Failed to generate summary")
        }

        const data = await response.json()
        setSummary(data.summary)
      } catch (error) {
        setError("Error summarizing transcription. Please try again.")
        console.error("Error summarizing transcription:", error)
      } finally {
        setIsSummarizing(false)
      }
    }
  }

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (question) {
      setIsAsking(true)
      setError("")
      try {
        const response = await fetch("/api/question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, context: transcription }),
        })

        if (!response.ok) {
          throw new Error("Failed to get answer")
        }

        const data = await response.json()
        setAnswer(data.answer)
      } catch (error) {
        setError("Error getting answer. Please try again.")
        console.error("Error getting answer:", error)
      } finally {
        setIsAsking(false)
      }
    }
  }

  return (
    <ErrorBoundary>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold mb-4">Record Meeting</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded ${
              isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold`}
            onClick={isRecording ? () => setShowConfirmDialog(true) : startRecording}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </motion.button>
          {transcription && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
              <p className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{transcription}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-bold flex items-center"
                onClick={handleSummarize}
                disabled={isSummarizing}
              >
                {isSummarizing ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">Summarizing...</span>
                  </>
                ) : (
                  "Summarize"
                )}
              </motion.button>
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
            <h2 className="text-xl font-semibold mb-2">Ask a question about the meeting:</h2>
            <form onSubmit={handleQuestionSubmit} className="space-y-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter your question"
                disabled={isAsking}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white font-bold flex items-center"
                disabled={isAsking}
              >
                {isAsking ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">Asking...</span>
                  </>
                ) : (
                  "Ask"
                )}
              </motion.button>
            </form>
            {answer && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Answer:</h3>
                <p className="bg-gray-100 p-4 rounded">{answer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showConfirmDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Are you sure you want to stop recording?</h3>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black font-bold"
                  onClick={() => setShowConfirmDialog(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-bold"
                  onClick={stopRecording}
                >
                  Stop Recording
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  )
}

