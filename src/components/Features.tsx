/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Mic, FileAudio, FileText, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

const FeatureCard = ({ icon, title, description, delay }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, }}
      whileInView={{ opacity: 1,}}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay}}
        className="text-blue-500 mb-4"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

const Features = () => {
  return (
    <section className="py-20 backdrop-blur-lg z-10 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12 text-white pacifico-regular font-light">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Mic size={40} />}
            title="Real-time Recording"
            description="Start recording your meetings with a single click."
            delay={0.1}
          />
          <FeatureCard
            icon={<FileAudio size={40} />}
            title="Audio Upload"
            description="Upload pre-recorded audio files for processing."
            delay={0.2}
          />
          <FeatureCard
            icon={<FileText size={40} />}
            title="AI Summarization"
            description="Get structured insights powered by Gemini 1.5 Flash."
            delay={0.3}
          />
          <FeatureCard
            icon={<MessageSquare size={40} />}
            title="Interactive Q&A"
            description="Ask follow-up questions based on the meeting content."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}

export default Features
