"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar"
import { Plus, MessageSquare, User, LogOut, ChevronDown } from "lucide-react"
import Loader from "@/components/Loader"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { signOut } from "next-auth/react"
import axios from "axios"
import { useState, useEffect } from "react"
import { getConversations } from "@/actions/getConversations"
import { createConversation } from "@/actions/createConversation"
import { useSession } from "next-auth/react"

export default function AppSidebar({selectedConversationId,setSelectedConversationId}: {selectedConversationId: string,setSelectedConversationId: (id: string) => void}) {

  const [conversations, setConversations] = useState<any>([])
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession()
  const handleLogout = () => {
    signOut()
  }
  const handleNewConversation = async () => {
    try {
      const response = await createConversation()
      if (typeof response === 'object' && 'id' in response) {
        setSelectedConversationId(response.id)
        setConversations((prevConversations: any) => [...prevConversations, response])
      }
    } catch (error) {
      console.error('Error creating conversation:', error)
    } 
  }

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const data: any = await getConversations();
        console.log(data)
        setConversations(data)
      } catch (error) {
        console.error('Error fetching conversations:', error)
      } finally {
        setLoading(false);
      }
    }
    fetchConversations()
  }, [])


  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">ChatBot AI</h1>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleNewConversation}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">New Chat</span>
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading ? <Loader /> : conversations.length>0 && conversations?.map((conversation: any) => (
                <SidebarMenuItem className={selectedConversationId === conversation.id ? 'bg-gray-100' : ''} key={conversation.id}>
                  <SidebarMenuButton className="h-10" onClick={() => setSelectedConversationId(conversation.id)}>
                    <MessageSquare className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{conversation.title}</span>
                      <span className="text-xs opacity-70">{conversation.time}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User className="h-4 w-4" />
                  <span>{session?.user?.name}</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}