import Link from "next/link"
import { Mic, Upload, List, Settings } from "lucide-react"

const sidebarItems = [
    { name: "Record Meeting", icon: Mic, href: "/dashboard/record" },
    { name: "Upload Recording", icon: Upload, href: "/dashboard/upload" },
    { name: "Saved Recordings", icon: List, href: "/dashboard/recordings" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export default function Sidebar() {
    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <nav>
                <ul>
                    {sidebarItems.map((item) => (
                        <li key={item.name} className="mb-4">
                            <Link href={item.href} className="flex items-center p-2 rounded hover:bg-gray-700">
                                <item.icon className="mr-2" size={20} />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

