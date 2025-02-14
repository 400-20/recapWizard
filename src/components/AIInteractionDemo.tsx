"use client"
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AIInteractionDemo = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const answerRef = useRef(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulate AI response (replace with actual API call)
        setAnswer('This is a simulated AI response to your question: "' + question + '". In a real implementation, this would be generated based on the meeting transcript and summary.');
        setQuestion('');
    };

    useEffect(() => {
        if (answer) {
            gsap.from(answerRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }, [answer]);

    return (
        <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-white">AI Interaction Demo</h2>
                <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    <form onSubmit={handleSubmit} className="mb-6">
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Ask a question about the meeting..."
                            className="w-full p-3 bg-gray-700 text-white rounded-md mb-4"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300"
                        >
                            Ask AI
                        </button>
                    </form>
                    {answer && (
                        <div ref={answerRef} className="bg-gray-700 p-4 rounded-md">
                            <h3 className="text-xl font-semibold mb-2 text-white">AI Response:</h3>
                            <p className="text-gray-300">{answer}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AIInteractionDemo;
