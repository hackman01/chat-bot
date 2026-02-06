"use client"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import ChatInterface from "@/components/ChatInterface"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useState } from "react"
import { useSession } from "next-auth/react"

export default function Home() {
  const session = useSession()
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  if (!session?.data?.user){
    return redirect('/auth/signin')
  }
  return (
    <SidebarProvider>
        <AppSidebar selectedConversationId={selectedConversationId!} setSelectedConversationId={setSelectedConversationId}/>
        <SidebarInset>
            <SidebarTrigger className="fixed" />
            <ChatInterface />
        </SidebarInset>
    </SidebarProvider>
)
}