"use client"

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { gsap } from "gsap";
import { FcGoogle } from "react-icons/fc";
import { GiCancel } from "react-icons/gi";


interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin] = useState<boolean>(true);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                modalRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
            );
        }
    }, [isOpen]);

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/dashboard" });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black"
                    onClick={onClose}
                >
                    <motion.div
                        ref={modalRef}
                        className="bg-white/70 backdrop-blur-sm  rounded-lg p-8 h-[30vh] max-w-md w-full relative shadow-xl flex flex-col items-center justify-center "
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className='absolute right-0 top-0 p-4 hover:cursor-pointer group' onClick={onClose}><GiCancel className="text-xl group-hover:text-red-500 smooth3 animate-pulse" />
                        </div>
                        <h2 className="text-4xl  mb-6 text-center pacifico-regular font-light ">
                            {isLogin ? "Login to Your Account" : "Create a New Account"}
                        </h2>

                        <button
                            onClick={handleGoogleSignIn}

                            className="w-full flex items-center justify-center gap-3 bg-gray-50  text-black font-medium py-2 px-4 rounded-lg hover:shadow-xl border border-gray-300 smooth3 hover:scale-105 "
                        >
                            <FcGoogle size={24} /> Continue with Google
                        </button>

                        {/* <p className="text-center mt-4">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? "Sign Up" : "Login"}
                            </button>
                        </p> */}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
