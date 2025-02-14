import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import HowItWorks from "@/components/HowItWorks"
// import AIInteractionDemo from "@/components/AIInteractionDemo"
import PricingPlans from "@/components/PricingPlans"
// import Testimonials from "@/components/Testimonials"
import FAQ from "@/components/FAQ"
import CallToAction from "@/components/CallToAction"
import Footer from "@/components/Footer"
import MouseMoveEffect from "@/components/mouse-move-effect"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <MouseMoveEffect />
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      {/* <AIInteractionDemo /> */}
      <PricingPlans />
      {/* <Testimonials /> */}
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  )
}

