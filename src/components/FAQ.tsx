/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const FAQItem = ({ question, answer }:any) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.from(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isOpen]);

  return (
    <div className="mb-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold text-white bg-gray-800 p-4 rounded-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div ref={answerRef} className="mt-2 p-4 bg-gray-700 rounded-lg">
          <p className="text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqItems = [
    {
      question: 'How accurate is the AI transcription?',
      answer: 'Our AI transcription boasts an accuracy rate of over 95% for clear audio inputs. The accuracy may vary depending on factors such as audio quality, background noise, and speaker accents.'
    },
    {
      question: 'Can I use this tool for multiple languages?',
      answer: 'Currently, our AI meeting assistant supports English, Spanish, French, and German. We are continuously working on expanding our language support.'
    },
    {
      question: 'How secure is my meeting data?',
      answer: 'We take data security very seriously. All audio files and transcripts are encrypted both in transit and at rest. We comply with GDPR and other data protection regulations.'
    },
    {
      question: 'Can I integrate this with my existing calendar and meeting tools?',
      answer: 'Yes, we offer integrations with popular calendar apps and video conferencing tools. Check our documentation for a full list of supported integrations.'
    },
    {
      question: 'What happens if the AI misunderstands something important?',
      answer: 'While our AI is highly accurate, users can always review and edit the generated summaries. We also provide the full transcript for reference.'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl pacifico-regular font-light text-center mb-12 text-white">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
