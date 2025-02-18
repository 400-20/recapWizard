import { motion } from "framer-motion"

export default function LoadingSpinner() {
  return (
    <motion.div
      className="w-6 h-6 border-2 border-blue-500 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    />
  )
}

