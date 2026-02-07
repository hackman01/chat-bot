'use client';

import { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getMessages } from "@/actions/getMessages"
import { Button } from './ui/button';
import Loader from "@/components/Loader"
import Chat from "./Chat"
import { showToast } from "@/lib/toast"

type ToolInvocations = {
    type: string;
    input: unknown;
    output: unknown;
}

type Message = {
    id: string;
    conversationId: string;
    role: "user" | "data" | "assistant" | "system" | "tool";
    content: string | null;
    toolInvocations: ToolInvocations | null;
    createdAt: Date;
}

export default function ChatInterface() {
  const [loading, setLoading] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [initMessages, setInitMessages] = useState<Message[]>([]);

  const initialMessages = async () => {
    if (!selectedConversationId) return;
    setLoading(true);
    //@ts-ignore
    const res : Message[] | { error: string } = await getMessages(selectedConversationId);
   
    if (typeof res === 'object' && 'error' in res) {
      console.error(res.error);
      showToast.error(res.error);
      setLoading(false);
      return;
    }
    
    if (res) {
      setInitMessages(res);
    }
    setLoading(false);
  };


  useEffect(() => {
    initialMessages();
  }, [selectedConversationId]);

   return <SidebarProvider>
    <AppSidebar selectedConversationId={selectedConversationId!} setSelectedConversationId={setSelectedConversationId}/>
    <SidebarInset>
        <SidebarTrigger className="fixed" />
    {loading ? <Loader /> : <Chat selectedConversationId={selectedConversationId!} initMessages={initMessages}/>}
    </SidebarInset>
    </SidebarProvider>
}