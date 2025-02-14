/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mic, FileAudio, FileText, MessageSquare } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const FeatureCard = ({ icon, title, description }:any) => {
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.from(cardRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    })
  }, [])

  return (
    <div ref={cardRef} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 smooth3">
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

const Features = () => {
  return (
    <section className="py-20 backdrop-blur-lg z-10 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl  text-center mb-12 text-white pacifico-regular font-light">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Mic size={40} />}
            title="Real-time Recording"
            description="Start recording your meetings with a single click."
          />
          <FeatureCard
            icon={<FileAudio size={40} />}
            title="Audio Upload"
            description="Upload pre-recorded audio files for processing."
          />
          <FeatureCard
            icon={<FileText size={40} />}
            title="AI Summarization"
            description="Get structured insights powered by Gemini 1.5 Flash."
          />
          <FeatureCard
            icon={<MessageSquare size={40} />}
            title="Interactive Q&A"
            description="Ask follow-up questions based on the meeting content."
          />
        </div>
      </div>
    </section>
  )
}

export default Features

