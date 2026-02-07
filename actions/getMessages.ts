"use server"
import { auth } from "@/lib/auth"
import db from "@/db"
import { conversations, messages } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getMessages(conversationId: string) {
    try {
        const session = await auth();
        
        if (!session?.user?.id) {
            throw new Error('User authentication required');
        }

        const message = await db.select().from(messages).where(eq(messages.conversationId, conversationId));

        return message;
    } catch (error) {
        console.error('Error getting messages:', error);
        return { error: 'Failed to get messages' }
    }
}
