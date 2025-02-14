import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getServerSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p>Here you can manage your recordings, transcriptions, and summaries.</p>
    </div>
  )
}

