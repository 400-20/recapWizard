/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, TechCorp",
    content:
      "This AI meeting assistant has revolutionized how we conduct and follow up on meetings. It's an indispensable tool for our team.",
  },
  {
    name: "Jane Smith",
    role: "Project Manager, InnovateCo",
    content:
      "The time saved on meeting notes and summaries is incredible. The AI's ability to answer follow-up questions is like having a personal meeting assistant.",
  },
  {
    name: "Mike Johnson",
    role: "Team Lead, DevPro",
    content:
      "Our team's productivity has skyrocketed since we started using this tool. The AI-generated summaries are spot-on and incredibly helpful.",
  },
]

const Testimonials = () => {
  const sliderRef = useRef(null)
  const testimonialsRef = useRef<any>([])

  useEffect(() => {
    const slider:any = sliderRef.current
    const testimonials = testimonialsRef.current

    gsap.to(testimonials, {
      xPercent: -100 * (testimonials.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: slider,
        pin: true,
        scrub: 1,
        snap: 1 / (testimonials.length - 1),
        end: () => "+=" + slider.offsetWidth,
      },
    })
  }, [])

  return (
    <section className="py-20 bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">What Our Users Say</h2>
        <div ref={sliderRef} className="overflow-hidden">
          <div className="flex">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                ref={(el:any) => (testimonialsRef.current[index] = el)}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
                  <p className="text-gray-300 mb-4">{testimonial.content}</p>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-blue-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

