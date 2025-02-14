/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Step = ({ number, title, description }:any) => {
  const stepRef = useRef(null)

  useEffect(() => {
    gsap.from(stepRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: stepRef.current,
        start: "top bottom-=100",
        end: "bottom center",
        toggleActions: "play none none reverse",
      },
    })
  }, [])

  return (
    <div ref={stepRef} className="flex items-start mb-8">
      <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  )
}

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl pacifico-regular font-light text-center mb-12 text-white">How It Works</h2>
        <div className="max-w-3xl mx-auto">
          <Step
            number="1"
            title="Record or Upload"
            description="Start a real-time recording during your meeting or upload a pre-recorded audio file."
          />
          <Step
            number="2"
            title="AI Transcription"
            description="Our advanced AI transcribes the audio with high accuracy."
          />
          <Step
            number="3"
            title="Summarization"
            description="Gemini 1.5 Flash analyzes the transcript and generates a structured summary."
          />
          <Step
            number="4"
            title="Interactive Q&A"
            description="Ask follow-up questions about the meeting content and receive AI-generated responses."
          />
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

