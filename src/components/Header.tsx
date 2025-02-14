"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import AuthModal from "./AuthModal"
import { MenuBar } from "./menu-bar"

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className=" text-white py-4 fixed w-full top-0 z-[999]">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl pacifico-regular font-light">
          Recap Wizard
        </Link>

        <MenuBar />
        
        {session ? (
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Dashboard
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => signOut()}
            >
              Sign Out
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Login / Sign Up
          </motion.button>
        )}
      </div>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  )
}

