
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import ChatInterface from "@/components/ChatInterface"

export default async function Home() {
    const session = await auth()

  if (!session?.user){
    return redirect('/auth/signin')
  }
  return (
    <ChatInterface />
)
}