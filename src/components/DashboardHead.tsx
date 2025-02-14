"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";

const DashboardHead = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-16 bg-gray-800 flex items-center justify-between px-6 relative"  onMouseLeave={() => setIsOpen(false)}>
      <p className="text-white text-lg font-semibold">Dashboard</p>
      <div className="relative">
        {session?.user ? (
          <div
            className="flex items-center space-x-4 cursor-pointer relative"
            onMouseEnter={() => setIsOpen(true)}

          >
            <span className="text-white">{session.user.name}</span>
            <Image
              src={session.user.image || "/default-avatar.png"}
              alt="User Avatar"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border border-white"
            />
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 top-11 mt-2 w-60 bg-white shadow-lg rounded-lg overflow-hidden"
                onMouseLeave={() => setIsOpen(false)}
              >
                <div className="p-4 border-b border-gray-200 text-center">
                  <Image
                    src={session.user.image || "/default-avatar.png"}
                    alt="User Avatar"
                    width={60}
                    height={60}
                    className="w-14 h-14 mx-auto rounded-full border border-gray-300"
                  />
                  <p className="text-gray-800 mt-2 font-medium truncate ">{session.user.name}</p>
                  <p className="text-gray-500 text-sm truncate ">{session.user.email}</p>
                </div>
                <button
                    onClick={() => {
                        localStorage.removeItem("hasLoggedIn"); 
                        signOut();
                    }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <span className="text-white">Not signed in</span>
        )}
      </div>
    </div>
  );
};

export default DashboardHead;