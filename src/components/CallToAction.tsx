"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CallToAction = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.from(ctaRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top bottom-=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  return (
    <section ref={ctaRef} className="py-20 bg-gray-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl pacifico-regular font-light mb-6 text-white">Ready to Transform Your Meetings?</h2>
        <p className="text-xl mb-8 text-gray-300">Join thousands of professionals who are saving time and boosting productivity with our AI meeting assistant.</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
          Start Your Free Trial
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
