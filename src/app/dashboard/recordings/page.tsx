"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSession } from "next-auth/react"
import LoadingSpinner from "@/components/LoadingSpinner"
import { toast } from "react-hot-toast"

interface Recording {
  _id: string
  originalName: string
  createdAt: string
  path: string
}

export default function SavedRecordings() {
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!session) return

      try {
        const response = await fetch("/api/recordings")
        if (!response.ok) {
          throw new Error("Failed to fetch recordings")
        }
        const data = await response.json()
        setRecordings(data)
      } catch (error) {
        console.error("Error fetching recordings:", error)
        toast.error("Failed to load recordings. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecordings()
  }, [session])

  if (!session) {
    return <div>Please sign in to view your saved recordings.</div>
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Saved Recordings</h1>
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {recordings.map((recording) => (
            <motion.div key={recording._id} whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">{recording.originalName}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Recorded on: {new Date(recording.createdAt).toLocaleString()}
              </p>
              <Link href={`/dashboard/recording/${recording._id}`}>
                <a className="text-blue-500 hover:text-blue-700">View Details</a>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

