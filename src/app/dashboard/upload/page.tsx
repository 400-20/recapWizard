"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function UploadRecording() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (file) {
      // Here you would implement the logic to upload the file,
      // transcribe it, and then summarize using the Gemini API
      console.log("Uploading and processing file:", file.name)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload Recording</h1>
      <div className="space-y-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
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
            className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-bold"
            onClick={handleUpload}
          >
            Upload & Process
          </motion.button>
        )}
      </div>
    </div>
  )
}

