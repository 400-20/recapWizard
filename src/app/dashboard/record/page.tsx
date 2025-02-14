"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import * as speechRecognition from "speech-recognition-polyfill"

export default function RecordMeeting() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription] = useState("")
  const [summary, setSummary] = useState("")
  const recognitionRef = useRef<speechRecognition.SpeechRecognition | null>(null)
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  //     if (!SpeechRecognition) {
  //       console.error("Speech recognition is not supported in this browser.")
  //       return
  //     }

  //     recognitionRef.current = new SpeechRecognition()
  //     recognitionRef.current.continuous = true
  //     recognitionRef.current.interimResults = true

  //     recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
  //       let interimTranscript = ""
  //       let finalTranscript = ""

  //       for (let i = event.resultIndex; i < event.results.length; ++i) {
  //         if (event.results[i].isFinal) {
  //           finalTranscript += event.results[i][0].transcript
  //         } else {
  //           interimTranscript += event.results[i][0].transcript
  //         }
  //       }

  //       setTranscription(finalTranscript + interimTranscript)
  //     }

  //     recognitionRef.current.start()
  //   }

  //   return () => {
  //     recognitionRef.current?.stop()
  //   }
  // }, [])

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsRecording(true)
    } else {
      console.error("Speech recognition is not supported in this browser.")
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleSummarize = async () => {
    if (transcription) {
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
        console.error("Error summarizing transcription:", error)
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Record Meeting</h1>
      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded ${
            isRecording ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </motion.button>
        {transcription && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
            <p className="bg-gray-100 p-4 rounded">{transcription}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-bold"
              onClick={handleSummarize}
            >
              Summarize
            </motion.button>
          </div>
        )}
        {summary && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Summary:</h2>
            <p className="bg-gray-100 p-4 rounded">{summary}</p>
          </div>
        )}
      </div>
    </div>
  )
}

