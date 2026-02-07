import db from "@/db"
import { conversations,messages } from "@/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@/lib/auth"

export async function updateTitle(conversationId: string) {
    try {
        const session = await auth();
        
        if (!session?.user?.id) {
            throw new Error('User authentication required');
        }
        const messagesData = await db.select().from(messages).where(eq(messages.conversationId, conversationId));
        const firstMessage = messagesData[0]?.content?.slice(0, 50) || 'New Chat';
        const conversation = await db.select().from(conversations).where(eq(conversations.id, conversationId));
        if(conversation.length === 0){
            throw new Error('Conversation not found');
        }
        if(conversation[0].title === 'New Chat'){
            await db.update(conversations).set({ title:firstMessage }).where(eq(conversations.id, conversationId));
        }
    } catch (error) {
        console.error('Error updating conversation title:', error);
        return { error: 'Failed to update conversation title' }
    }
}
