"use client"
import Link from "next/link"
import { Mic, Upload, List } from "lucide-react"
import { LuLogOut } from "react-icons/lu";
import {signOut } from "next-auth/react"



const sidebarItems = [
    { name: "Record Meeting", icon: Mic, href: "/dashboard/record" },
    { name: "Upload Recording", icon: Upload, href: "/dashboard/upload" },
    { name: "Saved Recordings", icon: List, href: "/dashboard/recordings" },
]

export default function Sidebar() {
    // const { data: session } = useSession()
    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <nav>
            <Link href="/" className="text-2xl pacifico-regular font-light w-full text-center  flex items-center justify-center mb-5">
          Recap Wizard
        </Link>
                <ul>
                    {sidebarItems.map((item) => (
                        <li key={item.name} className="mb-4 cursor-pointer smooth3 ">
                            <Link href={item.href} className="flex items-center p-2 rounded hover:bg-gray-700">
                                <item.icon className="mr-2" size={20} />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                    <li   
                onClick={() => {
                localStorage.removeItem("hasLoggedIn"); 
                signOut();
            }} className=" cursor-pointer smooth3 flex items-center p-2 rounded hover:bg-gray-700 gap-2"><LuLogOut />Logout</li>
                </ul>
            </nav>
        </aside>
    )
}

