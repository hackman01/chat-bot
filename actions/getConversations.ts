"use server"
import { auth } from "@/lib/auth"
import db from "@/db"
import { conversations } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getConversations() {
    try {
        const session = await auth();
        
        if (!session?.user?.id) {
            throw new Error('User authentication required');
        }

        const conversation = await db.select().from(conversations).where(eq(conversations.userId, session.user.id));

        return conversation;
    } catch (error) {
        console.error('Error getting conversation:', error);
        return { error: 'Failed to get conversation' }
    }
}
