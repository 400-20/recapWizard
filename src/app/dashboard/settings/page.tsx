"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function Settings() {
  const [apiKey, setApiKey] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the logic to securely store the API key
    // This could involve sending it to your backend to be encrypted and stored
    console.log("Saving API key:", apiKey)
    // After saving, you might want to show a success message or redirect
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
            Gemini API Key
          </label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Enter your Gemini API key"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold"
        >
          Save API Key
        </motion.button>
      </form>
    </div>
  )
}

