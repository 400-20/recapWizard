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
                className="  button"
              >
                  <span className="button-content">Dashboard </span>
              </motion.button>

            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button "
              onClick={() => {
                localStorage.removeItem("hasLoggedIn"); 
                signOut();
            }}
            
            >
            <span className="button-content"> Sign Out   </span>
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="  button"
            onClick={() => setIsModalOpen(true)}
          >
          <span className="button-content"> Login / Sign Up </span>
          </motion.button>
        )}
      </div>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  )
}

