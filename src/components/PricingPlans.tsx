/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const PlanCard = ({ title, price, features, isPopular }:any) => {
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
    <div
      ref={cardRef}
      className={`bg-gray-800 p-6 rounded-lg shadow-lg ${isPopular ? "border-2 border-blue-500" : ""}`}
    >
      {isPopular && <div className="text-blue-500 text-sm font-semibold mb-2">Most Popular</div>}
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <div className="text-4xl font-bold mb-6 text-white">
        ${price}
        <span className="text-xl text-gray-400">/mo</span>
      </div>
      <ul className="mb-6">
        {features.map((feature:any, index:any) => (
          <li key={index} className="mb-2 text-gray-300">
            ✓ {feature}
          </li>
        ))}
      </ul>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300">
        Choose Plan
      </button>
    </div>
  )
}

const PricingPlans = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl pacifico-regular font-light text-center mb-12 text-white">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PlanCard
            title="Basic"
            price={9.99}
            features={["5 hours of recording per month", "Basic AI summarization", "Email support"]}
          />
          <PlanCard
            title="Pro"
            price={24.99}
            features={[
              "20 hours of recording per month",
              "Advanced AI summarization",
              "Unlimited Q&A",
              "Priority support",
            ]}
            isPopular={true}
          />
          <PlanCard
            title="Enterprise"
            price={49.99}
            features={["Unlimited recording", "Custom AI model training", "API access", "24/7 dedicated support"]}
          />
        </div>
      </div>
    </section>
  )
}

export default PricingPlans

