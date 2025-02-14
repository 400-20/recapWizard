"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Recording {
  id: string
  name: string
  date: string
  duration: string
}

export default function SavedRecordings() {
  const [recordings, setRecordings] = useState<Recording[]>([])

  useEffect(() => {
    // Here you would fetch the user's saved recordings from your backend
    // For now, we'll use mock data
    const mockRecordings: Recording[] = [
      { id: "1", name: "Team Meeting", date: "2024-02-14", duration: "1:30:00" },
      { id: "2", name: "Client Call", date: "2024-02-13", duration: "45:00" },
      { id: "3", name: "Project Review", date: "2024-02-12", duration: "1:00:00" },
    ]
    setRecordings(mockRecordings)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Saved Recordings</h1>
      <div className="space-y-4">
        {recordings.map((recording) => (
          <motion.div key={recording.id} whileHover={{ scale: 1.02 }} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{recording.name}</h2>
            <p className="text-sm text-gray-500">Date: {recording.date}</p>
            <p className="text-sm text-gray-500">Duration: {recording.duration}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm"
            >
              View Summary
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

